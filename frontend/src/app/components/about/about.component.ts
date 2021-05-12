import { AuthServiceService } from "./../auth/auth-service.service";
import { Component, OnInit } from "@angular/core";
import{TranslateService}from'@ngx-translate/core'

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  togleShow: boolean = true; 

  constructor(private AuthServiceService: AuthServiceService){}

  ngOnInit(): void {
    this.AuthServiceService.togleShow.subscribe((s) => {
      this.togleShow = s;
      console.log(s);
    });
  }
}
