const expect = require('chai').expect;
const authMiddleware = require('../middleware/is-auth');
const sinon = require('sinon');

describe('Auth middleware', function(){

    it('throw error if no authorization header present',function(){
        const req = {
            get: function(headerName){
                return null;
            }
        };
        expect(authMiddleware.bind(this,req,{},()=>{})).to.throw('Not authenticated');
    });
    
    it('throw error if authorization header is only one string.',function(){
        const req = {
            get: function(headerName){
                return 'xyz';
            }
        };
        expect(authMiddleware.bind(this,req,{},()=>{})).to.throw('Not authenticated');
    });

    it('throw error if authorization header token cannot be verified.',function(){
        const req = {
            get: function(headerName){
                return 'Bearer eyJhb';
            }
        };
        expect(authMiddleware.bind(this,req,{},()=>{})).to.throw('Not authenticated');
    });

    it('shuuld yield a userId after decoing the token.',function(){
        const req = {
            get: function(headerName){
                return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN3YXRhbnRyYWt1bWFyMjhAZ21haWwuY29tIiwidXNlcklkIjoyLCJpYXQiOjE1NTY5NzQzNTksImV4cCI6MTU1NzA2MDc1OX0.N7nBpz-kFwYjaO9FdFCV-sc2ThR05QsWI1yTaD93fdw';
            }
        };
        sinon.stub(jwt,'verify');
        jwt.verify.returns({userId: 'abc'});
        authMiddleware(req,{},()=>{});
        expect(req).to.have.property('userId');
        expect(req).to.have.property('userId','abc');
        jwt.verify.restore();
    });


})

