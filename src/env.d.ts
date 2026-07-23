/// <reference types="astro/client" />


interface Env {

	CONTACTS: R2Bucket;

}


type Runtime = import("@astrojs/cloudflare").Runtime<Env>;


declare namespace App {

	interface Locals extends Runtime {}

}