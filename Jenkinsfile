pipeline {
    agent any
    
    tools { nodejs 'node' }
    
    stages {
        stage('Build') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Siddarthan999/Rick-and-Morty-POC-Project.git']])
                bat 'npm install'
                bat 'npm run build'
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
                    // Add a new site for "Rick and Morty 2"
                    bat 'C:\\Windows\\System32\\inetsrv\\appcmd add site /name:"Rick and Morty 3" /physicalPath:"C:\\inetpub\\wwwroot\\Rick-and-Morty-POC-Project-3" /bindings:http/*:86:'
                }
            }
        }
    }
}
