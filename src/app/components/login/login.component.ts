import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private spotifyAuthService: SpotifyService, private route: ActivatedRoute, private router: Router) {}

  login(): void {
    this.spotifyAuthService.initiateAuthorization();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      if (code) {
        this.spotifyAuthService.exchangeCodeForToken(code).subscribe((tokenResponse) => {
          if(tokenResponse.access_token !== ''){
            localStorage.setItem('token', tokenResponse.access_token);
            this.router.navigate(['/home']);
          } else {
            window.open("https://open.spotify.com/intl-es")
            alert("No se pudo obtener información, registrate!")
          }
          console.log('Token de Acceso:', tokenResponse.access_token);
        });
      }
    });
  }
}
