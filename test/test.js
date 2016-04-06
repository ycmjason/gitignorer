var assert = require('assert'),
    fs = require('fs');

var handlers = require('../lib/handlers');

describe('gitignorer', function(){
  describe('init', function(){
    it('should create .gitignore file with default profile', function(done){
      handlers.init(undefined, undefined, () => {
        /* if read of the file have error
         * it means that init is not doing the right thing */
        assert(fs.readFileSync("./.gitignore"));
        done();
      });
    });
    describe('someprofile', function(){
//      handlers.init('someprofile');
    });
  });

  describe('add', function(){
    describe('somefile.txt', function(){
      it('should add somefile.txt to .gitignore', function(done){
        handlers.add(['somefile.txt'], undefined, () => {
          var lines = fs.readFileSync('./.gitignore', 'utf-8')
                        .split('\n');
          assert(lines.indexOf('somefile.txt') > -1);
          done();
        });
      });
    });

    describe('somefile1 somefile2 somefile3', function(){
      it('should add somefile1 somefile2 somefile3', function(done){
        handlers.add(['somefile1', 'somefile2', 'somefile3'], undefined, () => {
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
        handlers.add(arg_files, undefined, () => {
          handlers.remove(arg_files, undefined, () => {
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
        handlers.add(arg_files, undefined, () => {
          handlers.remove(arg_files, undefined, () => {
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

  });

  describe('profile', function(){

  });

  describe('', function(){

  });
});
