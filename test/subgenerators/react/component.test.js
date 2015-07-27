/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;
var createAppGenerator = require('../../helpers/create-generator').createAppGenerator;
var createSubGenerator = require('../../helpers/create-generator').createSubGenerator;

describe('React component sub-generator', function() {
  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        return done(err);
      }

      this.app = createAppGenerator([], {path: '../../../../app'});

      done();
    }.bind(this));
  });

  describe('Create react files when using React', function() {
    it('Handles defaults', function(done) {
      // Filename
      var component = 'mycomponent';
      var filesToTest = [
        'src/screens/App/components/' + component + '/__tests__/' + component + '.test.js',
        'src/screens/App/components/' + component + '/' + component + '.js'
      ];
      var fileContentToTest = [
        ['src/screens/App/components/' + component + '/' + component + '.js', /React\.createClass/i]
      ];

      helpers.mockPrompt(this.app, {
        jsFramework: 'react'
      });
      this.app.run([], function() {
        createSubGenerator('component', component, {path: '../../../../'}, {
          // mock prompt data
          componentFile: 'src/screens/App/components'
        }, function() {
          assert.file(filesToTest);
          assert.fileContent(fileContentToTest);
          done();
        });
      });
    });
    it('Handles defaults with JSX', function(done) {
      // Filename
      var component = 'mycomponent';
      var filesToTest = [
        'src/screens/App/components/' + component + '/__tests__/' + component + '.test.js',
        'src/screens/App/components/' + component + '/' + component + '.js'
      ];

      helpers.mockPrompt(this.app, {
        jsFramework: 'react'
      });
      this.app.run([], function() {
        createSubGenerator('component', component, {path: '../../../../'}, {
          // mock prompt data
          componentFile: 'src/screens/App/components'
        }, function() {
          assert.file(filesToTest);
          done();
        });
      });
    });
    it('Handles defaults without testing', function(done) {
      // Filename
      var component = 'mycomponent';
      var filesToTest = [
        'src/screens/App/components/' + component + '/' + component + '.js'
      ];
      var filesNotCreated = [
        'src/screens/App/components/' + component + '/__tests__/' + component + '.test.js'
      ];

      helpers.mockPrompt(this.app, {
        jsFramework: 'react',
        testFramework: 'none'
      });
      this.app.run([], function() {
        createSubGenerator('component', component, {path: '../../../../'}, {
          // mock prompt data
          componentFile: 'src/screens/App/components'
        }, function() {
          assert.file(filesToTest);
          assert.noFile(filesNotCreated);
          done();
        });
      });
    });
  });
});