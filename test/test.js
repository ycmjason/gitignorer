var assert = require('assert'),
    fs = require('fs'),
    profiles = require('filesys-db')().getCollection('profiles');


var handlers = require('../lib/handlers');

require('../lib/messages');

describe('gitignorer', function(){

  afterEach(function(done){
    fs.stat('.gitignore', (err) => {
      if(err) return done();
      fs.unlink('.gitignore', profiles.remove.bind(profiles, {}, () => done()));
    });
  });

  describe('init', function(){
    it('should create .gitignore file with default profile', function(done){
      profiles.put({name: 'default', ignored_files: []}, () => {
        handlers.init(undefined, {}, () => {
          /* if read of the file have error
           * it means that init is not doing the right thing */
          assert(fs.statSync("./.gitignore"));
          done();
        });
      });
    });

    it('should not create .gitignore as it exists already', function(done){
      fs.writeFile('.gitignore', 'some data', (err) => {
        if(err) throw err;
        handlers.init(undefined, {}, () => {
          fs.readFile('.gitignore', (err, content) => {
            if(err) throw err;
            assert.equal(content, 'some data');
            done();
          });
        });
      });
    });
    describe('someprofile', function(){
//      handlers.init('someprofile');
    });
  });

  describe('add', function(){
    describe('somefile.txt', function(){
      it('should add somefile.txt to .gitignore', function(done){
        handlers.add(['somefile.txt'], {}, () => {
          var lines = fs.readFileSync('./.gitignore', 'utf-8')
                        .split('\n');
          assert(lines.indexOf('somefile.txt') > -1);
          done();
        });
      });
    });

    describe('somefile1 somefile2 somefile3', function(){
      it('should add somefile1 somefile2 somefile3', function(done){
        handlers.add(['somefile1', 'somefile2', 'somefile3'], {}, () => {
          var lines = fs.readFileSync('./.gitignore', 'utf-8')
                        .split('\n');
          assert(lines.indexOf('somefile1') > -1);
          assert(lines.indexOf('somefile2') > -1);
          assert(lines.indexOf('somefile3') > -1);
          done();
        });
      });
    });

    describe('--profile amazing', function(){
// add test for this
    });

  });

  describe('remove', function(){
    describe('somefile.txt', function(){
      it('should remove somefile.txt to .gitignore', function(done){
        var arg_files = ['somefile.txt'];
        // add somefile.txt to make sure it is there
        handlers.add(arg_files, {}, () => {
          handlers.remove(arg_files, {}, () => {
            var lines = fs.readFileSync('./.gitignore', 'utf-8')
                          .split('\n');
            assert(lines.indexOf('somefile.txt') < 0);
            done();
          });
        });
      });
    });

    describe('somefile1 somefile2 somefile3', function(){
      it('should add somefile1 somefile2 somefile3', function(done){
        var arg_files = ['somefile1', 'somefile2', 'somefile3'];
        handlers.add(arg_files, {}, () => {
          handlers.remove(arg_files, {}, () => {
            var lines = fs.readFileSync('./.gitignore', 'utf-8')
                          .split('\n');
            assert(lines.indexOf('somefile1') < 0);
            assert(lines.indexOf('somefile2') < 0);
            assert(lines.indexOf('somefile3') < 0);
            done();
          });
        });
      });
    });

  });

  describe('list', function(){
    it('should list current gitignore file', function(done){
      fs.writeFile('.gitignore', 'some awesome data 2', (err) => {
        if(err) throw err;
        handlers.list({}, (output) => {
          assert.equal(output, 'some awesome data 2');
          done();
        });
      });
    });
    describe('-p default', function(){
      it('should list of given profile', function(done){
        fs.writeFile('.gitignore', 'some awesome data 2', (err) => {
          if(err) throw err;
          handlers.list({}, (output) => {
            assert.equal(output, 'some awesome data 2');
            done();
          });
        });
      });
    });

  });

  describe('profile', function(){

  });

  describe('', function(){

  });
});
