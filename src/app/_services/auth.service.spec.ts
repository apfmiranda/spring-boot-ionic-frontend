import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDto } from './../_models/credenciais-dto';
import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('Serviço de autenticação', () => {

  const data = {
    body: '',
    headers: {
        headers: {
            authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGV4YW5kcm'  +
                           'UubWlyYW5kYUBnbWFpbC5jb20iLCJleHAiOjE1NTY2MzAxNTJ9.' +
                           'cei1ntfOT7uHvfwusIep7sdmyi-NySyVSJSYZMPlgHKMxtznfKM' +
                           'lIEZ5Gaul0LUbFpIAIUDvcvjeDDqrD0eDDw',
            lazyInit: null,
            lazyUpdate: null
        }
    },
    ok: true,
    status: 200,
    statusText: 'OK',
    type: 4,
    url: 'http://localhost:8080/login',
  };

  // We declare the variables that we'll use for the Test Controller and for our Service
  let httpMock: HttpTestingController;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule]
    });

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthService);

  });

  afterEach(() => {
    httpMock.verify();
  });

  beforeAll(function () {
    console.log('beforeAll - executa uma vez antes de todos testes');
  });

  afterAll(function () {
      console.log('afterAll - executa uma vez após todos testes');
  });

  it('authenticate(credenciais: CredenciaisDto)', () => {
    service.authenticate({email: 'alexandre.miranda@gmail.com', senha: '123456'})
    .subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.headers.get('Authorization'));
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/login`);
    expect(req.request.method).toEqual('POST');

    // Then we set the fake data to be returned by the mock
    req.flush({data});
  });

});
