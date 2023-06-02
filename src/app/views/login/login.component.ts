import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  UserModel = new User();
  
  message = "";

  // Validating Login

  ValidationLogin () {

    const BlackList: string[] = ["select ", "or ", "from ", "drop ", "having ", "group ", "by ",
                                  "insert ", "exec ", "and ", "id ", "is ", "all ", "null", "union ",
                                  "waitfor ", "delay ", "case ", "when ", "then ", "function ", "if(",
                                  "else(", "else ", "columnnames ", "sum(columnname )", "tablename ",
                                  "into ", "users", "like", "'like'", "rlike", "version", "upper",
                                  "convert", "int,", "sleep", "pg_sleep", "&&sleep", "randomblob",
                                  "substring", "admin", "benchmark", "+benchmark", "selectchar", "+char",
                                  "char(", "cast(", "hex(", "mds(", "'inj'", "'ect'", "'xxx'",
                                  "mid(version(),1,1)", "min(name)", "(select(sleep(10)))a)",
                                  "%2c(select%20*%20from%20(select(sleep(10)))a)", "81dc9bdb52d04dc20036dbd8313ed055",
                                  "sysobjects ", "where ", "xtype ", "injectx ", "name ", "'u'", "'x'", "'m'", "'i'",
                                  "'y'", "'c'", "'s'", "", '"', "'", "`", ",", ";", ":", "--", "#", "*", "'&'", '"&"',
                                  "'^'", '"^"', ">", "<", "%", "(", ")", "{", "}", "[", "]", "'.'", "1=1", "1=0", "x=x",
                                  "x=y", "3409=3409", "-1", "'1", "1'", "-1'", "'2", "-2", "'5'", "=", "'='", "+", "/", "//",
                                  "\ ", "\\", "'=0--+", "'x'='x", "%00", "%", "|", "||", "variable", "@variable", "@@variable",
                                  "order ", "true", "false", "1--+", "2--+", "3--+", "1,2--+", "1,2,2--+", "0:0:30", "0:0:5",
                                  "00:00:05", "@,@", "@,@,@", "pytw", "'pytw'", "'pytw", "'pyty", "pklz", "pkly", "txws", "xcjl",
                                  "wapiti", "vrxe", "'vrxe", "nqip", "abcdefg", "1234"];
    
    BlackList.forEach(EachWord => {
      if (this.UserModel.email?.toLowerCase().includes(EachWord)) {
        this.message = "Dados Iválidos";

        return;
        
      } else {

        this.loginService.login(this.UserModel).subscribe({
          next: (response) => {
            console.log(response);
            console.log(response.body.user.nome);
            localStorage.setItem("UserName", response.body.user.nome);
            this.router.navigateByUrl("/");
          }, error: (MsgError) => {
            console.log(MsgError.error); // Deixado aqui apenas para fins de exercício, porém imagino que não seja seguro deixar tal informação no console
            this.message = MsgError.error; // Deixado aqui apenas para fins de exercício, porém imagino que não seja seguro armazenar tal informação numa variável no código
    
            // Tratativa feita apenas para fins de exercício, porém imagino que não seja seguro armazenar tal informação numa variável no código ou em elementos html visíveis
            if (MsgError.error == "Password is too short") {
              this.message = "Senha é curta demais";
            } else if (MsgError.error == "Incorrect password") {
              this.message = "Senha incorreta";
            } else if (MsgError.error == "Email format is invalid") {
              this.message = "Formato de e-mail inválido"
            } else if (MsgError.error == "Email and password are required") {
              this.message = "E-mail e senha são requeridos"
            } else {
              this.message = MsgError.error;
            }
          } 
        })  
      }
    })

  }

}
