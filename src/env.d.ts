/// <reference types="astro/client" />
/// <reference types="@types/cloudflare-turnstile" />

interface Env {
  RD_DATA: R2Bucket;
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals {
    runtime: Runtime;
  }
}