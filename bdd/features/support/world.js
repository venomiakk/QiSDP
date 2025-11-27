import {
  setWorldConstructor,
  Before,
  After,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { chromium, request } from "@playwright/test";

setDefaultTimeout(60 * 1000);

class CustomWorld {
  constructor() {
    this.browser = null;
    this.page = null;
    this.apiRequestContext = null;
    this.lastApiResponse = null; 
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  // Setup UI
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  // Setup API
  this.apiRequestContext = await request.newContext({
    baseURL: "http://localhost:8091",
  });
});

After(async function () {
  await this.browser.close();
  await this.apiRequestContext.dispose();
});
