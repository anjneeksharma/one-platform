import dotenv from 'dotenv';
/* Mock */
import mock from './mock.json';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.test.env')});
import <%= serviceClassName %> from '../../service';

/* Supertest */
import supertest from 'supertest';

let request: supertest.SuperTest<supertest.Test>;
const query = `
  query List {
    list {
      message
    }
  }
  query Get($_id: String!) {
    get(_id: $_id) {
      message
    }
  }
  mutation Create($input: <%= serviceClassName %>Input) {
    create(input: $input) {
      message
    }
  }
  mutation Update($input: <%= serviceClassName %>Input) {
    update(input: $input) {
      message
    }
  }
  mutation Delete($_id: String!) {
    delete(_id: $_id) {
      message
    }
  }
`;

beforeAll(done => {
  <%= serviceClassName %>.then((server: any) => {
    request = supertest(server);
    done();
  });
});

describe('<%= serviceClassName %> microservice API Test', () => {
  it('List should return all documents', done => {
    request
      .post('/graphql')
      .send({
        query: query,
        operationName: 'List'
      })
      .expect(res => {
        expect(res.body).not.toHaveProperty('errors');
        expect(res.body).toHaveProperty('data');

        expect(res.body.data.list[0].message).toEqual('GET API for <%= serviceClassName %> microservice');
      })
      .end((err, res) => {
        done(err);
      });
  });

  it('Get should return a single matched document', done => {
    request
      .post('/graphql')
      .send({
        query: query,
        operationName: 'Get',
        variables: { _id: 'mock_id' }

      })
      .expect(res => {
        expect(res.body).not.toHaveProperty('errors');
        expect(res.body).toHaveProperty('data');

        expect(res.body.data.get.message).toEqual('GET by ID API for <%= serviceClassName %> microservice');
      })
      .end((err, res) => {
        done(err);
      });
  });

  it('Create should create a document', done => {
    request
      .post('/graphql')
      .send({
        query: query,
        operationName: 'Create',
        variables: {
          input: mock
        }
      })
      .expect(res => {
        expect(res.body).not.toHaveProperty('errors');
        expect(res.body).toHaveProperty('data');

        expect(res.body.data).toHaveProperty('create');
        expect(res.body.data.create).toMatchObject({'message': 'POST API for <%= serviceClassName %> microservice'});
      })
      .end((err, res) => {
        done(err);
      });
  });

  it('Update should update a document', done => {
    request
      .post('/graphql')
      .send({
        query: query,
        operationName: 'Update',
        variables: {
          input: mock
        }
      })
      .expect(res => {
        expect(res.body).not.toHaveProperty('errors');
        expect(res.body).toHaveProperty('data');

        expect(res.body.data).toHaveProperty('update');
        expect(res.body.data.update).toMatchObject({message: 'PUT API for <%= serviceClassName %> microservice'});
      })
      .end((err, res) => {
        done(err);
      });
  });

  it('Delete should delete a document', done => {
    request
      .post('/graphql')
      .send({
        query: query,
        operationName: 'Delete',
        variables: { _id: 'mock_id' }
      })
      .expect(res => {
        expect(res.body).not.toHaveProperty('errors');
        expect(res.body).toHaveProperty('data');

        expect(res.body.data).toHaveProperty('delete');
        expect(res.body.data.delete).toMatchObject({message: 'DELETE API for <%= serviceClassName %> microservice'});
      })
      .end((err, res) => {
        done(err);
      });
  });
});