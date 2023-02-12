# wapp_simple_todo_vue

![](https://asdertasd.site/counter/wapp_simple_todo_vue)

Простой таск менеджер на vue аки trello с сохранением на webdav, github-api и drag&drop.

[DEMO](https://hightemp.github.io/wapp_simple_todo_vue)

![](/images/2023-02-11_10-36.png)

## Перед сборкой

Прописать в apache 

```
Alias /webdav /var/www/webdav

<Directory /var/www/webdav>
    DAV On

    AllowOverride None
    Options Indexes FollowSymLinks
    Require all granted

    Header always set Access-Control-Allow-Origin "*"
    Header always set Access-Control-Allow-Headers "origin, content-type, cache-control, accept, authorization, if-match, destination, overwrite, depth"
    Header always set Access-Control-Expose-Headers "ETag"
    Header always set Access-Control-Allow-Methods "GET, HEAD, POST, PUT, OPTIONS, MOVE, DELETE, COPY, LOCK, UNLOCK, PROPFIND, MKCOL"
    Header always set Access-Control-Allow-Credentials "true"
</Directory>
```

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key -out /etc/ssl/certs/apache-selfsigned.crt
```

```
<VirtualHost *:443>
    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/apache-selfsigned.crt
    SSLCertificateKeyFile /etc/ssl/private/apache-selfsigned.key
</VirtualHost>
```