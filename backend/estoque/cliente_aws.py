import os
import boto3

def get_bucket():
    s3 = boto3.resource('s3', 
        region_name=os.getenv('AWS_REGION'), 
        aws_access_key_id=os.getenv('AKIAUEMJG4WOGZPMTUUE'), 
        aws_secret_access_key=os.getenv('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')
    )
    return s3.Bucket(os.getenv('AWS_BUCKET'))
