import { expect } from 'chai';
import { ErrorResponseService } from '../../../src/services/error/errorResponseService';

import expectedErrorResponse from './expectedErrorResponse.json';

describe('Error Response Service', () => {
  describe('getErrorResponse', function() {
    it('should test that an error response is created', () => {
      const errorResponse = ErrorResponseService.getErrorResponse(400, '/ishealthy', 'Missing credentials.', 'Header X-APPLE-ID and / or X-PASSWORD is missing.');

      expect(errorResponse).to.deep.equal(expectedErrorResponse);
    });
  });
});
