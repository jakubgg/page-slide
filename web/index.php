<?php $page = '1'; ?>
<?php include 'header.php'; ?>

<div class="navigation">
    <ul>
        <li><span data-slider-number="1" data-slider-status="current">index</span>
        <li><a href="page2" data-slider-number="2">page2</a>
            <ul>
                <li><a data-slider-number="2-1" href="page2-1">page2-1</a>
                <li><a data-slider-number="2-2" href="page2-2">page2-2</a>
                    <ul>
                        <li><a data-slider-number="2-2-1" href="page2-2-1">page2-2-1</a>
                        <li><a data-slider-number="2-2-2" href="page2-2-2">page2-2-2</a>
                        <li><a data-slider-number="2-2-3" href="page2-2-3">page2-2-3</a>
                    </ul>
                <li><a data-slider-number="2-3" href="page2-3">page2-3</a>
            </ul>
        </li>
        <li><a data-slider-number="3" href="page3">page3</a>
    </ul>
</div>

<div class="page-element page-1">
    <h1>Homepage</h1>

    <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas.
        Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
        egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et
        sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet,
        wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac
        dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>

    <h2>Header Level 2</h2>

    <ol>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
    </ol>

    <blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet
            congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis,
            tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p>
    </blockquote>

    <h3>Header Level 3</h3>

    <ul>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
    </ul>

<pre><code>
        #header h1 a {
        display: block;
        width: 300px;
        height: 80px;
        }
    </code></pre>
</div>

<?php include 'footer.php'; ?>

