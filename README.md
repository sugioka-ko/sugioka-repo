サーバーレスWebアプリ（CloudFormationデプロイ）
このプロジェクトは、CloudFormationを使ってAWS上に以下のリソースを自動でデプロイします。

AWS Lambda (Python 3.13)

Amazon DynamoDB

Amazon API Gateway

Amazon Bedrock

デプロイ手順
このプロジェクトをデプロイするには、以下の手順を実行してください。

前提条件

AWSアカウントが設定済みであること。

AWS CLIがローカルにインストールされ、aws configureで認証情報が設定されていること。

デプロイコマンド
プロジェクトのルートディレクトリで、以下のAWS CLIコマンドを実行します。

aws cloudformation deploy \
  --template-file template.yaml \
  --stack-name MyServerlessApp \
  --capabilities CAPABILITY_IAM


デプロイの確認
デプロイが完了すると、各サービスが作成されます。

APIエンドポイントの確認
CloudFormationのスタック詳細画面の出力タブから、ApiUrlのURLを取得してください。このURLが、ReactアプリからLambda関数を呼び出すためのエンドポイントになります。

作成されたCognitoのユーザープールID、ドメイン、クライアントIDを貼り付けてください。

ローカルでのReact実行
ReactアプリのApp.jsを開き、取得したApiUrlをAPI_URLに貼り付けて、npm startでローカル実行してください。