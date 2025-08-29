import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));

// Only load Builder.io dev tools in development mode
if (process.env['NODE_ENV'] !== 'production') {
  import("@builder.io/dev-tools/angular").then(({ builderDevTools }) => {
    builderDevTools().catch((err: Error) =>
      console.error("Error starting dev tools:", err)
    );
  });
}