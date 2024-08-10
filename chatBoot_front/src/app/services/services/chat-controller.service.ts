/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getChatResponse } from '../fn/chat-controller/get-chat-response';
import { GetChatResponse$Params } from '../fn/chat-controller/get-chat-response';

@Injectable({ providedIn: 'root' })
export class ChatControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getChatResponse()` */
  static readonly GetChatResponsePath = '/chat/message';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getChatResponse()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getChatResponse$Response(params: GetChatResponse$Params, context?: HttpContext): Observable<StrictHttpResponse<{ response: string }>> {
    return getChatResponse(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), use `getChatResponse$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getChatResponse(params: { message: string }, context?: HttpContext): Observable<{ response: string }> {
    return this.getChatResponse$Response({ body: params }, context).pipe(
      map((r: StrictHttpResponse<{ response: string }>) => r.body)
    );
  }
}
