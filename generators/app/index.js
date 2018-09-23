'use strict'
const Generator = require('yeoman-generator')
const cowsay = require('cowsay')

module.exports = class extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(
      cowsay.say({
        text: 'Generater sequelize swagger!!',
        e: 'oo',
        T: 'L!'
      })
    )

    const prompts = [
      {
        type: 'input',
        name: 'serverName',
        message: 'Enter project name: ',
        default: 'sequelize_swagger'
      },
      {
        type: 'input',
        name: 'serverVersion',
        message: 'Enter project version: ',
        default: '1.0.0'
      },
      {
        type: 'input',
        name: 'serverDescription',
        message: 'Enter project description: '
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author: '
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author Email: '
      },
      {
        name: 'addReadme',
        type: 'confirm',
        message: 'would you like to have README.md included in the project?',
        default: true
      },
      {
        name: 'useTravis',
        type: 'confirm',
        message: 'would you like to have Travis included in the project?',
        default: false
      },
      {
        name: 'useAppveyor',
        type: 'confirm',
        message: 'would you like to have Appveyor included in the project?',
        default: false
      },
      {
        name: 'useDocker',
        type: 'confirm',
        message: 'would you like to have Docker included in the project?',
        default: false
      }
    ]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
    })
  }

  writing () {
    let createDirName = 'sequelize_swagger'
    if (this.props.serverName) {
      createDirName = this.props.serverName
    }
    this.fs.copy(
      this.templatePath('./sequelize_swagger'),
      this.destinationPath(createDirName)
    )
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath(`${createDirName}/.gitignore`)
    )
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(`${createDirName}/package.json`),
      {
        serverName: this.props.serverName,
        serverDescription: this.props.serverDescription,
        serverVersion: this.props.serverVersion,
        author: this.props.author,
        authorEmail: this.props.authorEmail
      }
    )
    if (this.props.addReadme) {
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath(`${createDirName}/README.md`)
      )
    }
    if (this.props.useTravis) {
      this.fs.copy(
        this.templatePath('travis.yml'),
        this.destinationPath(`${createDirName}/.travis.yml`)
      )
    }
    if (this.props.useAppveyor) {
      this.fs.copy(
        this.templatePath('appveyor.yml'),
        this.destinationPath(`${createDirName}/appveyor.yml`)
      )
    }
    if (this.props.useDocker) {
      this.fs.copy(
        this.templatePath('Dockerfile'),
        this.destinationPath(`${createDirName}/Dockerfile`)
      )
      this.fs.copy(
        this.templatePath('dockerignore'),
        this.destinationPath(`${createDirName}/.dockerignore`)
      )
    }
  }

  // install () {
  //   this.installDependencies()
  // }
}
