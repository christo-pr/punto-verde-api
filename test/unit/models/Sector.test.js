"use strict";

const assert = require('chai').assert;
const Model = require('../../../api/models/Sector');
const Fixture = require('../../fixtures/SectorFixture');

const newSector = {
  name: 'testSector',
};

describe('models:Sector', () => {
  it('Should be create a new Sector', done => {
    Sector
      .create(newSector)
      .then(sector => {
        assert.equal(sector.name, newSector.name);
        done();
      })
      .catch(done);
  });

  it('Should remove Sector', done => {
    Sector
      .destroy({name: newSector.name})
      .then(sectors => {
        assert.equal(sectors[0].name, newSector.name);
        done();
      })
      .catch(done);
  });
});
