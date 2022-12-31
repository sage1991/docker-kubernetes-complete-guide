# Replace travis CI with GitHub action

1. Navigate to your GitHub repository.
2. Click Settings
3. Click Secrets
4. Click Actions
5. Click New repository secret
6. Create key/value pair secrets for AWS_ACCESS_KEY, AWS_SECRET_KEY, DOCKER_USERNAME, DOCKER_PASSWORD.
   > Important - You do not need to create an environment or environment secrets.    
   > Doing so will cause a failure of the action without making additional changes to the workflow file.

   ![example image](https://img-c.udemycdn.com/redactor/raw/q_and_a_edit/2022-10-18_15-42-51-274103e4e22764ebfbeb809f26fdea24.png)

7. In your local development environment, create a `.github` directory at the root of your project
8. Create a workflows directory inside the new `.github` directory
9. In the workflows directory create a deploy.yaml file which should contain the following code (name does not matter):
   - Remember to change your application_name, environment_name, existing_bucket_name, and region to the values used by your AWS EBS environment.
   - Remember to check your default branch to see if it is main or master and update the branches field accordingly.

    ``` yaml
    name: Deploy Frontend
    on:
      push:
        branches:
          - main # check your repo, your default branch might be master!
     
    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v2
          - run: docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}
          - run: docker build -t cygnetops/react-test -f Dockerfile.dev .
          - run: docker run -e CI=true cygnetops/react-test npm test
     
          - name: Generate deployment package
            run: zip -r deploy.zip . -x '*.git*'
     
          - name: Deploy to EB
            uses: einaregilsson/beanstalk-deploy@v18
            with:
              aws_access_key: ${{ secrets.AWS_ACCESS_KEY }}
              aws_secret_key: ${{ secrets.AWS_SECRET_KEY }}
              application_name: docker-gh
              environment_name: Dockergh-env
              existing_bucket_name: elasticbeanstalk-us-east-1-923445559289
              region: us-east-1
              version_label: ${{ github.sha }}
              deployment_package: deploy.zip
    ```

10. Run the typical git add, commit and push commands
11. Click Actions in the GitHub repository dashboard to view each step of the workflow.

> Note - This code is using a well-supported marketplace action, more info can be found here:  
> https://github.com/einaregilsson/beanstalk-deploy