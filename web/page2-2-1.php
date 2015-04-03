<?php $page = '2-2-1'; ?>
<?php include 'header.php'; ?>

<div class="navigation">
    <ul>
        <li><a href="/" data-slider-number="1">index</a>
        <li><a data-slider-number="2" href="page2">page2</a>
            <ul>
                <li><a data-slider-number="2-1" href="page2-1">page2-1</a>
                <li><a data-slider-number="2-2" href="page2-2">page2-2</a>
                    <ul>
                        <li><span data-slider-number="2-2-1" data-slider-status="current">page2-2-1</span>
                        <li><a data-slider-number="2-2-2" href="page2-2-2">page2-2-2</a>
                        <li><a data-slider-number="2-2-3" href="page2-2-3">page2-2-3</a>
                    </ul>
                <li><a data-slider-number="2-3" href="page2-3">page2-3</a>
            </ul>
        </li>
        <li><a data-slider-number="3" href="page3">page3</a>
    </ul>
</div>

<div class="page-element page-2-2-1">
    <h1>First page of <u>third</u> level of page #2</h1>

    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>

    <dl>
        <dt>Definition list</dt>
        <dd>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.</dd>
        <dt>Lorem ipsum dolor sit amet</dt>
        <dd>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.</dd>
    </dl>
</div>

<?php include 'footer.php'; ?>
