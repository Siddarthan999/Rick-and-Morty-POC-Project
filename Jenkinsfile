pipeline {
    agent any
    
    tools { 
        nodejs 'node'
        terraform 'terraform'
    }
    
    stages {
        stage('Build') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Siddarthan999/Rick-and-Morty-POC-Project.git']])
                bat 'npm install'
                bat 'npm run build'
            }
        }
        
        stage('Terraform Setup') {
            steps {
                script {
                    // Clone the GitHub repository containing Terraform code
                    checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Siddarthan999/Rick-and-Morty-Terraform-Configuration.git']])
                    
                    // Ensure Terraform is available in the PATH
                    bat 'terraform --version'
                    
                    // Initialize Terraform
                    bat 'terraform init'
                    
                    // Apply Terraform configuration to check installations
                    bat 'terraform apply -auto-approve'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    def buildOutputPath = "${WORKSPACE}\\dist"
                    def iisPath = "C:\\inetpub\\wwwroot\\Rick-and-Morty-POC-Project-3"

                    // Ensure build output exists
                    bat "if not exist \"${buildOutputPath}\" exit 1"
                    
                    // Clean IIS directory
                    bat "if exist \"${iisPath}\" rd /s /q \"${iisPath}\""
                    
                    // Create IIS directory
                    bat "mkdir \"${iisPath}\""
                    
                    // Copy build output to IIS directory
                    bat "xcopy /s /e /y \"${buildOutputPath}\" \"${iisPath}\""
                }
            }
        }
        
        stage('IIS Configuration') {
            steps {
                script {
                    // Check if the site already exists
                    def siteExists = bat(script: 'C:\\Windows\\System32\\inetsrv\\appcmd list site /name:"Rick and Morty 3"', returnStatus: true) == 0

                    // If the site exists, delete it
                    if (siteExists) {
                        bat 'C:\\Windows\\System32\\inetsrv\\appcmd delete site /site.name:"Rick and Morty 3"'
                    }

                    // Add the new site for "Rick and Morty 3"
                    bat 'C:\\Windows\\System32\\inetsrv\\appcmd add site /name:"Rick and Morty 3" /physicalPath:"C:\\inetpub\\wwwroot\\Rick-and-Morty-POC-Project-3" /bindings:http/*:86:'
                }
            }
        }
    }
}
