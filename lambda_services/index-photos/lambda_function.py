import json
import boto3
import data_index
import time

PHOTO_BUCKET = 'photo-store-bucket'


s3_client = boto3.client('s3')

def get_file_name(event):
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        print('s3....',bucket,key)
        return key

def lambda_handler(event, context):
    label_list=[]
    
    FILE_NAME = get_file_name(event)
    print('reading image: {} from s3 bucket {}'.format(FILE_NAME, PHOTO_BUCKET))
    client = boto3.client('rekognition')
    response = client.detect_labels(
        Image={
            'S3Object': {
                'Bucket': PHOTO_BUCKET,
                'Name': FILE_NAME
            }
        },
        MaxLabels=10,
        MinConfidence=60,
    )

    print('Detected labels for ' + FILE_NAME)
    for label in response['Labels']:
        print (label['Name'] + ' : ' + str(label['Confidence']))
        label_list.append(label['Name'])
    
    ts = time.gmtime()
    created_time = time.strftime("%Y-%m-%dT%H:%M:%S", ts)
    print('Image created at {}....'.format(created_time))
    
    image_object = {
        'objectKey':FILE_NAME,
        'bucket':PHOTO_BUCKET,
        'createdTimestamp':created_time,
        'labels':label_list
    }
    
    es = data_index.connect_to_elastic_search()
    es.index(index="photos", doc_type="_doc", id=created_time, body=image_object)

    #print(es.get(index="photos", doc_type="_doc", id=created_time))
    response = es.get(index="photos", doc_type="_doc", id=created_time)
   
    return response