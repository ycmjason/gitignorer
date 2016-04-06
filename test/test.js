var assert = require('assert'),
    fs = require('fs'),
    profiles = require('filesys-db')().getCollection('profiles');


var handlers = require('../lib/handlers');

require('../lib/messages');
function assertGitignore(expect, done){
  fs.readFile('.gitignore', 'utf-8', (err, content) => {
    if(err) throw err;
    var actual= content.split('\n');
    for(var i = 0; i < expect.length; ++i){
      assert(actual.indexOf(expect[i]) > -1);
    }
    done();
  });
}

assertGitignore.without = function(files, done){
  fs.readFile('.gitignore', 'utf-8', (err, content) => {
    if(err) throw err;
    var actual= content.split('\n');
    for(var i = 0; i < files.length; ++i){
      assert(actual.indexOf(files[i]) < 0);
    }
    done();
  });
}

function assertProfile(name, expect, done){
  profiles.findOne({name: name}, (p) => {
    assert(p);
    assert.deepEqual(p.ignored_files, expect);
    done();
  });
}

describe('gitignorer', function(){

  afterEach(function(done){
    fs.stat('.gitignore', (err) => {
      if(err) return done();
      fs.unlink('.gitignore', profiles.remove.bind(profiles, {}, () => {
        profiles.remove({}, () => done());
      }));
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
      fs.writeFile('.gitignore', 'some data\n', (err) => {
        if(err) throw err;
        handlers.init(undefined, {}, () => {
          assertGitignore(['some data'], done);
        });
      });
    });
    describe('someprofile', function(){
      it('should create .gitignore with someprofile', function(done){
        profiles.put({name: 'someprofile', ignored_files: ['a', 'b']}, () => {
          handlers.init('someprofile', {}, () => {
            assertGitignore(['a', 'b'], done);
          });
        });
      });
    });
  });

  describe('add', function(){
    describe('somefile.txt', function(){
      it('should add somefile.txt to .gitignore', function(done){
        handlers.add(['somefile.txt'], {}, () => {
          assertGitignore(['somefile.txt'], done);
        });
      });
    });

    describe('somefile1 somefile2 somefile3', function(){
      it('should add somefile1 somefile2 somefile3', function(done){
        handlers.add(['somefile1', 'somefile2', 'somefile3'], {}, () => {
          assertGitignore(['somefile1', 'somefile2', 'somefile3'], done);
        });
      });
    });

    describe('--profile amazing', function(){
      it('should add a b c to amazing profile', function(done){
        profiles.put({name: 'amazing', ignored_files: ['a', 'b', 'c']}, () => {
          handlers.add(['a', 'b', 'c'], {profile: 'amazing'}, () => {
            assertProfile('amazing', ['a', 'b', 'c'], done);
          });
        });
      });
    });

  });

  describe('remove', function(){
    describe('somefile.txt', function(){
      it('should remove somefile.txt to .gitignore', function(done){
        var arg_files = ['somefile.txt'];
        // add somefile.txt to make sure it is there
        handlers.add(arg_files, {}, () => {
          handlers.remove(arg_files, {}, () => {
            assertGitignore.without(['somefile.txt'], done);
          });
        });
      });
    });

    describe('somefile1 somefile2 somefile3', function(){
      it('should remove somefile1 somefile2 somefile3', function(done){
        var arg_files = ['somefile1', 'somefile2', 'somefile3'];
        handlers.add(arg_files, {}, () => {
          handlers.remove(arg_files, {}, () => {
            assertGitignore.without(arg_files, done);
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

    describe('-p', function(){
      it('should list all profiles', function(done){
        profiles.find({}, (ps) => {
          handlers.list({profile: true}, (output) => {
            assert.equal(ps.map((ps) => ps.name).join('\n'), output);
            done();
          });
        });
      });
    });

    describe('-p jjprofile', function(){
      it('should list of given profile', function(done){
        profiles.put({name: 'jjprofile', ignored_files: ['awesome', 'awesome2']}, () => {
          handlers.list({profile: 'jjprofile'}, (output) => {
            assert.equal(output, 'awesome\nawesome2');
            done();
          });
        });
      });
    });

  });

  describe('profile', function(){
    describe('--add', function(){
      it('should create my profile in database', function(done){
        handlers.profile('myprofile', {create: true}, () => {
          profiles.findOne({name: 'myprofile'}, (p) => {
            assert(p);
            done();
          });
        });
      });
    });

    describe('--delete', function(){
      it('should delete my profile in database', function(done){
        handlers.profile('myprofile', {delete: true}, () => {
          profiles.findOne({name: 'myprofile'}, (p) => {
            assert(!p);
            done();
          });
        });
      });
    });

    describe('--copy myprofile2', function(){
      it('should copy myprofile to myprofile2', function(done){
        profiles.put({name: 'myprofile', ignored_files: ['1', '2', 'j']}, () => {
          handlers.profile('myprofile', {copy: 'myprofile2'}, () => {
            // original profile still exists
            profiles.findOne({name: 'myprofile'}, (p) => {
              assert.deepEqual(p.ignored_files, ['1', '2', 'j']);
              // new profile also exists
              profiles.findOne({name: 'myprofile2'}, (p) => {
                assert.deepEqual(p.ignored_files, ['1', '2', 'j']);
                done();
              });
            });

          });
        });
      });
    });

    describe('--move myprofile2', function(){
      it('should move myprofile to myprofile2', function(done){
        profiles.put({name: 'myprofile', ignored_files: ['1', '2', 'j']}, () => {
          handlers.profile('myprofile', {move: 'myprofile2'}, () => {
            profiles.findOne({name: 'myprofile'}, (p) => {
              assert(!p);
              profiles.findOne({name: 'myprofile2'}, (p) => {
                assert.deepEqual(p.ignored_files, ['1', '2', 'j']);
                done();
              });
            });
          });
        });
      });

    });
  });

});
