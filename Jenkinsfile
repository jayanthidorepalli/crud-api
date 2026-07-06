pipeline {
    agent any

    environment {
        HOST = "172.31.13.84"
        APP_DIR = "/home/ubuntu/crud-api"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy') {
            steps {
                sshagent(credentials: ['ec2-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@${HOST} '
                        cd ${APP_DIR} &&
                        git pull origin main &&
                        npm install &&
                        npx prisma generate &&
                        pm2 restart crud-api
                    '
                    """
                }
            }
        }

        stage('Health Check') {
            steps {
                sh """
                ssh -o StrictHostKeyChecking=no ubuntu@${HOST} '
                    curl http://localhost:3000/health
                '
                """
            }
        }
    }

    post {
        success {
            echo 'CRUD API deployed successfully.'
        }

        failure {
            echo 'Deployment failed.'
        }
    }
}
