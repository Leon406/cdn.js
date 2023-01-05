# 静态CDN资源失效自动切换

## **:warning: 此库作为本地资源加载,不要用cdn加载**

## 使用方式

```
<head>
    ...
    <script type="text/javascript" src="dist/cdn.js"></script>
    <script type="text/javascript">
        <!--   You should specify the package, version,ile, and your local resource path     -->
        loadCdnResource("jquery", "3.6.3", "jquery.min.js", "local.js", 2000)
        <!--   and also can custom total CDN check timeout for quick response     -->
        loadCdnResource("jquery", "3.6.3333", "jquery.min.js", "local.js", 2000)
    </script>
    ...
</head>
```

备选服务方式,有默认cdn, 仅在CDN服务宕机后重新加载:rocket:

<head>
    ...
    <script type="text/javascript" src="https://cdn.staticfile.org/jquery/3.6.3.3/jquery.min.js"></script>
    <script type="text/javascript" src="dist/cdn.js"></script>
    <script type="text/javascript">
        !window.jQuery&&loadCdnResource("jquery", "3.6.3", "jquery.min.js", "local.js")
    </script>
    ...
</head>

## CDN

### 国内CDN

- [七牛云](https://www.staticfile.org/)
- [360 75CDN](https://cdn.baomitu.com/)
- [饿了吗](https://npm.elemecdn.com)
- [知乎](https://unpkg.zhimg.com)
- [CDNBee](https://www.beecdn.com/)
- [BootCDN](http://www.bootcdn.cn/)
- [loli](https://cdnjs.loli.net/)
- [字节](http://cdn.bytedance.com/)

### 国外CDN

- [CDNJS](https://cdnjs.com/) :star:	
- [jsDelivr](http://www.jsdelivr.com/)
- [unpkg](https://unpkg.com/)

