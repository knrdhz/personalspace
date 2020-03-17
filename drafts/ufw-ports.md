When I was trying to establish a reverse proxy in front of the server that runs this very website using NGINX I have encountered a problem that I couldn't resolve in a logical terms.

Basically, my end goal was to establish the following workflow:
1. NodeJS running a server on some arbitrary port (1337, let's say)
2. NGINX running a reverse proxy with SSL certificates on port 443
3. NGINX handling port 80 which sole purpose is to redirect the traffic to port 443

In theory, everything was well documented, I have used CERTBOT from Let's Encrypt to automatically generate a site config for the NGINX that would write down the paths to the certificates and automate the muddy path providing. Here's my NGINX config for the reference:

```nginx

server {
    listen 80;
    listen [::]:80;
    server_name knrdhz.me *.knrdhz.me;
    access_log  /var/log/nginx/port80.access.log;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name example.com *.example.com;

    location / {
            proxy_pass_header Authorization;
            proxy_pass http://123.456.7.8:9000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_http_version 1.1;
            proxy_set_header Connection [34m~@~\[34
            proxy_buffering off;
            client_max_body_size 0;
            proxy_read_timeout 36000s;
            proxy_redirect off;
    }

    access_log  /var/log/nginx/port443.access.log;
	# Certificate paths go below
}
```
I have saved the file, ran `nginx -s reload` and... well, port 80 was silent, whereas https:// in front of my website's URL redirected it straight into secure connection workflow.

That was not the scenario I wanted to establish, the HTTP to HTTPS redirect was clearly not working. I have checked the NGINX documentation, local logs, plethora of forums and blogs and could not find a solution.

**When suddenly...**

I realized I forgot about one of the most basic features installed on my server: a firewall! Once I realized that the port 80 was blocked by `ufw`, it hit home.

So here's a quick sample on how to allow internet traffic to pass through the ports that NGINX is patiently listening at:

1. Type `sudo ufw app list` - this will return a list of all the apps that `ufw` can be configured to handle, basically something like that:

```bash
Output
  Available applications:
	AIM
	Bonjour
	CIFS
	DNS
	Deluge
	IMAP
	...
    Nginx Full
    Nginx HTTP
    Nginx HTTPS
	...
```
Nginx Full will unlock access both to port 80 and 443, Nginx HTTP will unlock 80 and Nginx HTTPS 443.

2. Run `sudo ufw allow 'Nginx Full'` (or any other option - depending on your needs)
3. Check if the change worked by running `sudo ufw status`
4. Restart NGINX with `nginx -s reload` (might need sudo here)

And that's it! This is how you allow NGINX to run a reverse-proxy in front of your NodeJS server. Hopefully this short story of mine will save you at least few moments of trouble.
