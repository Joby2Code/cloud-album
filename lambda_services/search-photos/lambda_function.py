import json
import boto3
import data_index

lex_client = boto3.client('lex-runtime')
IMG_SOURCE_LINK = 'https://s3.amazonaws.com/photo-store-bucket/'

def create_image_objects(hits,result):
    image_url_set = set()
    for i in range(0,len(hits)):
        source = hits[i]['_source']
        if source['objectKey'] not in image_url_set:
            image_url_set.add(source['objectKey'])
            img = {}
            img['url'] = IMG_SOURCE_LINK+source['objectKey']
            #img['bucket'] = source['bucket']
            img['labels'] = source['labels']
            result.append(img)
        else:
            pass
        
    return result
    
    

def lambda_handler(event, context):
    query = event['query']['q']
    #query = 'show me flowers and dogs'
    sessionAttributes = {}
    response = lex_client.post_text(
        botName="SearchPhotos",
        botAlias="SearchPhotos",
        userId="test",
        sessionAttributes=sessionAttributes,
        inputText=query
    )
    print(response['message']);
    search_query = response['message']
    #search_query = 'cat,flower'
    
    keys = search_query.split(',')
    result = [];resp={}
    
    
    #resp['statusCode'] = str(200)
    es = data_index.connect_to_elastic_search()
    
    for i in range(len(keys)):
        
        if keys[i].endswith('s'):
            length = len(keys[i])-1
            keys[i] = keys[i][0:length]
            print(keys[i])
            
        res = es.search(q=keys[i])
        result = create_image_objects(res['hits']['hits'],result)
    
    
    resp['results'] = result  
    
    return {
        'statusCode': str(200),
        'results': result,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
        }