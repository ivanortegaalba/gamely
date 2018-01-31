import apiMiddleware, { CALL_API, callApi } from '../api';
import schemas from '../../schemas';
import gameMock from '../../__mocks__/game';
import { ADD_TO_FAVOURITES } from '../../actions/ActionTypes';

// TODO: Remove fixed responses. Use snapshots testing.
// The test results explain how the middleware api works
describe('API middleware', () => {
  describe('callApi', () => {
    const endpoint = 'test/url/example';
    const entitySchema = schemas.game;
    it('should returns the response normalized', async () => {
      fetch.resetMocks();
      fetch.mockResponseOnce(JSON.stringify({ ...gameMock }));
      const result = await callApi(endpoint, entitySchema);
      expect(result).toEqual({
        entities: {
          games: {
            [gameMock.short]: gameMock,
          },
        },
        result: gameMock.short,
      });
    });
    it('should call fetch with the correct params', async () => {
      fetch.resetMocks();
      fetch.mockResponseOnce(JSON.stringify({ ...gameMock }));
      await callApi(endpoint, entitySchema);
      expect(fetch.mock.calls.length).toBe(1);
      expect(fetch.mock.calls[0]).toEqual([endpoint]);
    });
  });
  describe('the api middleware receive a correct action to fetch', () => {
    it('should dispatch the SUCCESS and the REQUEST actions', async () => {
      const next = jest.fn();
      fetch.resetMocks();
      fetch.mockResponseOnce(JSON.stringify({ ...gameMock }));
      const callApiAction = {
        [CALL_API]: {
          types: ['REQUEST', 'SUCCESS', 'FAILURE'],
          schema: schemas.game,
          endpoint: 'whatever/endpoint/',
        },
      };
      await apiMiddleware({})(next)(callApiAction);
      expect(next.mock.calls.length).toBe(2);
      expect(next.mock.calls[0]).toEqual([{ type: 'REQUEST' }]);
      expect(next.mock.calls[1]).toEqual([
        {
          response: {
            entities: {
              games: {
                [gameMock.short]: gameMock,
              },
            },
            result: gameMock.short,
          },
          type: 'SUCCESS',
        },
      ]);
    });
  });
  describe('the api middleware receive a wrong status code from fetch', () => {
    it('should dispatch the SUCCESS and the REQUEST actions', async () => {
      const next = jest.fn();
      fetch.resetMocks();
      fetch.mockRejectOnce(
        Error(JSON.stringify({ error: 'whatever standard error from server' }))
      );
      const callApiAction = {
        [CALL_API]: {
          types: ['REQUEST', 'SUCCESS', 'FAILURE'],
          schema: schemas.game,
          endpoint: 'whatever/endpoint/',
        },
      };
      await apiMiddleware({})(next)(callApiAction);
      expect(next.mock.calls.length).toBe(2);
      expect(next.mock.calls[0]).toEqual([{ type: 'REQUEST' }]);
      expect(next.mock.calls[1]).toEqual([
        {
          error: '{"error":"whatever standard error from server"}',
          type: 'FAILURE',
        },
      ]);
    });
  });
  describe('the api middleware receive a action not wrapped in a call api action', () => {
    it('should dispatch the action without to call the api', async () => {
      const next = jest.fn();
      const standardAction = {
        type: ADD_TO_FAVOURITES,
      };
      await apiMiddleware({})(next)(standardAction);
      expect(next.mock.calls.length).toBe(1);
      expect(next.mock.calls[0]).toEqual([standardAction]);
    });
  });
});
