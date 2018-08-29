let SubscriptionCard = require('./subscriptionCard');
let expect = require('chai').expect

describe('Class SubscriptionCard unit tests', function () {
    let card;
    beforeEach(function () {
        card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
    })
    it('initial initialaizing', function () {
        expect(card.firstName).to.be.equal('Pesho')
        expect(card.lastName).to.be.equal('Petrov')
        expect(card.SSN).to.be.equal('00000000')
    })
    describe('isBlocked property', function () {
        it('should return false initial', function () {
            expect(card.isBlocked).to.be.equal(false)
        })
        it('should return true', function () {
            card.block()
            expect(card.isBlocked).to.be.equal(true)
        })
        it('should return false', function () {
            card.block()
            card.unblock()
            expect(card.isBlocked).to.be.equal(false)
        })
    })
    describe('addSubscription', function () {
        it('subscription should be 0 initially', function () {
            expect(card._subscriptions.length).to.be.equal(0);
        })
        it('should add subscription correctly', function () {
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card._subscriptions.length).to.be.equal(1);
            expect(card._subscriptions[0].line).to.be.equal('120');
            expect(card._subscriptions[0].startDate).to.be.eql(new Date('2018-04-22'));
            expect(card._subscriptions[0].endDate).to.be.eql(new Date('2018-05-21'));

        })
        it('should add subscription correctly', function () {
            card.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card._subscriptions.length).to.be.equal(2);
        })
    })
    describe('isValid', function () {
        it('should add return false for blocked card', function () {
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            card.block();
            expect(card.isValid('120', new Date('2018-04-23'))).to.be.equal(false);
        })
        it('should add return true for valid card', function () {
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-04-23'))).to.be.equal(true);
        })
        it('should add return true for valid card', function () {
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-04-22'))).to.be.equal(true);
        })
        it('should add return true for valid card', function () {
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-05-21'))).to.be.equal(true);
        })
        it('should add return false for invalid date', function () {
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-04-21'))).to.be.equal(false);
        })
        it('should add return false for invalid date', function () {
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-05-22'))).to.be.equal(false);
        })
        it('should add return false for invalid line', function () {
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('121', new Date('2018-05-22'))).to.be.equal(false);
        })
        it('should add return false for valid card', function () {
            card.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
            expect(card.isValid('1111', new Date('2018-06-24'))).to.be.equal(true);
        })
        it('should add return false for valid card', function () {
            card.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
            expect(card.isValid('1111', new Date('2018-05-25'))).to.be.equal(true);
        })
        it('should add return false for invalid date', function () {
            card.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
            expect(card.isValid('1111', new Date('2018-05-24'))).to.be.equal(false);
        })
        it('should add return false for invalid date', function () {
            card.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
            expect(card.isValid('1111', new Date('2018-06-25'))).to.be.equal(false);
        })
    })
    it('should return false when block card', function () {
        card.block()
        expect(card.isBlocked).to.be.equal(true);
    })
    it('should return true when unblock card', function () {
        card.block()
        card.unblock()
        expect(card.isBlocked).to.be.equal(false);
    })
    it('should not change properties',function () {
        card.firstName='Nasko';
        card.lastName='Vasilev';
        card.SSN='11111';
        expect(card.firstName).to.be.equal('Pesho')
        expect(card.lastName).to.be.equal('Petrov')
        expect(card.SSN).to.be.equal('00000000')
    })

})