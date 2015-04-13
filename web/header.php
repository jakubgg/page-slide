<!doctype html>
<html class="no-js">
<head>
    <meta charset="utf-8">
    <title>Page slide prototype | page <?= $page; ?></title>

    <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1.0">
    <?php if (( ! empty( $_SERVER['HTTP_X_REQUESTED_WITH'] ) && strtolower( $_SERVER['HTTP_X_REQUESTED_WITH'] ) == 'xmlhttprequest' ) === false) { ?>
        <link rel="stylesheet" href="/css/PageSlide.css?v=<?php echo filemtime(__DIR__ . '/css/PageSlide.css'); ?>">

        <script src="/js/head.js" data-headjs-load="/js/PageSlide.js?v=<?php echo filemtime(__DIR__ . '/js/PageSlide.js'); ?>" async></script>

    <?php } ?>
</head>

<body id="main">
<div class="main-wrapper page-<?= $page; ?>">
