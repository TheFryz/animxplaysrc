<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="application-name" content="AniMixPlay">
<meta name="apple-mobile-web-app-title" content="AniMixPlay">
<meta name="msapplication-starturl" content="/">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, shrink-to-fit=no, user-scalable=no">
<meta property="og:image" content="/assets/icon.png">
<meta property="og:title" content="Title: Fryz">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="theme-color" content="#191919">
<meta name="twitter:card" content="summary">
<link rel="icon" href="/assets/icon.png">
<link rel="apple-touch-icon" href="/assets/images/icon.png">
<link rel="manifest" href="/assets/s/manifest.json">
<title>Title: Fryz</title>
<script type="text/javascript" src="/assets/lib/jquery.min.js" defer></script>
<link rel="stylesheet" href="/assets/fonts.min.css">
<link rel="stylesheet" type="text/css" href="/assets/style.min980b.css?m8">

<script type="text/javascript" src="/assets/main.minabec.js?m12" defer></script>


<meta property="og:description" content="Description: Fryz">
<meta name="description" content="Description: Fryz">
</head>

<body style="background-color:rgb(25,25,25)">
  <div id="coverlight"></div>
  <div id="loadcontainer">
    <div class="loadindicator"></div>
  </div>
  <div class="toppart">
    <div id="playertopmenu" class="floattopsearch">
      <a id="backicon" onclick="window.history.back()"><i class="glyphicon glyphicon-chevron-left"></i></a>
      <a id="homeicon" href="index.html"><i class="glyphicon glyphicon-home"></i></a>
      <div id="searchbox">
        <input type="text" style="display:none">
        <input type="password" style="display:none">
        <a href="index.html"><img class="webtitle" alt="AnimixPlay" src="/assets/logo.png" /></a>
        <input class="form-control searchbar" pattern=".{3,}" placeholder="Search" id="q" type="search" autocomplete="off" onfocus="searchfocused()" onblur="searchblur()" />
        <button id="searchbutton" onclick="dosearchfromplayer()"><i class="glyphicon glyphicon-search"></i></button>
        <a class="topmenubtn" title="Random anime" href="#random"><i class="glyphicon glyphicon-random"></i>Random</a>
        <a class="topmenubtn" title="A-Z List" href="list.html">A-Z List</a>
      </div>
      <span id="usernametop"></span>
      <button id="menumobilebtn2" onclick="showmobilemenu()"><i class="glyphicon glyphicon-menu-hamburger"></i></button>
      <button id="showsearchbtn" onclick="togglesearch()"><i class="glyphicon glyphicon-search"></i></button>
    </div>
  </div>
  <div class="quicksearchcontainer absolutee">
    <div class="resultcontainer sanimepage">
      <div id="fullresultbtn">
        <a onclick="cSearch('full')">Full</a><a onclick="cSearch('gogo')">GOGO</a><a onclick="cSearch('al')">AL</a><a onclick="cSearch('rush')">RUSH</a><a onclick="cSearch('mal')">MAL</a>
      </div>
      <ul class="quickresult"></ul>
    </div>
  </div>
  <div class="middle">
    <div id="flexcontainer">
      <div class="leftside">
	  
	  
        <div id="featuredcard">
          <div id="featuredbgcont">
            <img id="featuredbg" src="https://cachecow.eu/i/66ad707d39fab4a8cf5bc84c946a7bd8.jpg" />
          </div>
          <div id="featuredcont">
            <a href="https://animixplay.to/anime/51417/Engage_Kiss"><img id="featuredimg" src="https://cachecow.eu/i/66ad707d39fab4a8cf5bc84c946a7bd8.jpg" /></a>
            <div id="featuredtitle"><a href="https://animixplay.to/anime/51417/Engage_Kiss">Featured Title</a></div>
            <div id="featuredtext">
              Featured Description
            </div>
            <div id="featuredgenre"><i class="glyphicon glyphicon-tag"></i> Genere</div>
			<!-- 
            <a id="featuredNext" onclick="showFeatured(curFeatured + 1)"><i class="glyphicon glyphicon-chevron-right"></i></a>
            <a id="featuredBack" onclick="showFeatured(curFeatured - 1)"><i class="glyphicon glyphicon-chevron-left"></i></a>
			-->
          </div>
        </div>

        <div id="navtab">
          <ul class="nav nav-tabs">
            <li id="allbtn" class="active" onclick="showall()"><a>Sub</a></li>
            <li id="dubbtn" onclick="showdub()"><a style="border-bottom: 1px solid #e36a6a;">Dub</a></li>
            <li id="recentbtn" onclick="showrecent()"><a>All</a></li>
            <li id="followedbtn" onclick="showfollow()"><a>Followed</a></li>
            <li id="popularbtn" onclick="showpopular()"><a>Popular</a></li>
            <li id="moviebtn" onclick="showmovie()"><a>Movie</a></li>
          </ul>
        </div>
        <div id="seasontopnav">
          <div id="prevseasonbtn" onclick="seasonPrev()">&lt; Previous season</div>
          <div id="nextseasonbtn" onclick="seasonNext()">Next season &gt;</div>
          <select id="topfilterselect" onchange="seasonFilterChange()">
            <option value="all">Show all</option>
            <option value="new">New</option>
            <option value="continuing">Continuing</option>
          </select>
        </div>
        <div id="genresortbtn">
          Sort by :
          <select id="topsortselect" onchange="filterSortChange()">
            <option value="any">none</option>
            <option value="popular" selected>Popularity</option>
            <option value="rating">Rating</option>
            <option value="latest">Latest added</option>
          </select>
        </div>
        <div id="resultplace">
          <ul class="searchresult">
		  
		  
		  
		  
		  
            <li><a href="http://localhost/v1/kingdom-4th-season/ep18" title="Temp: Title">
                <div class="searchimg">
                  <img class="resultimg" alt="" src="https://cachecow.eu/i/01289d4f1b14c18d6afbe185551f80c6.jpg" />
                  <div class="timetext">2022-12-12 12:12:12</div>
                  <div class="rating">1000</div>
                </div>
                <div class="details">
                  <p class="name">Template</p>
                  <p class="infotext">EP 0/0</p>
                </div>
              </a></li>
			
			
			
			
          </ul>
          <div id="bottommsg">
            <div id="loadmorelist" onclick="loadmorenewep();"><i class="glyphicon glyphicon-menu-down"></i> Load more</div>
          </div>
        </div>
        <div id="loadingtext">
          <svg class="spinner" width="75px" height="75px" viewbox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
          </svg><br><br>Loading...
        </div>
        <div id="resultAlt">
          <div id="loadmoresearch">Loading...</div>
        </div>
        <br>
      </div>
      <div class="rightside" id="rightsidee">
        <div class="rightcard">
          <div class="loadingreplacement">Loading...</div>
          <div class="usercard"></div>
        </div>

        <div class="rightcard mobilemenureplace">
          <a class="topmenubtn" onclick="showschedulemenu()"><i class="glyphicon glyphicon-calendar"></i>Schedule</a>
          <a class="topmenubtn" title="Random anime" href="#random"><i class="glyphicon glyphicon-random"></i>Random</a>
          <a class="topmenubtn" title="A-Z List" href="#list">A-Z List</a>
        </div>
        <div class="rightcard">
          <div class="flexrightcard" id="seasonfilter">
            <div id="seasonleft">
              <label for="seasonselect">Season:</label>
              <select id="seasonselect">
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Fall">Fall</option>
              </select>
            </div>
            <div id="yearright">
              <label for="yearselect">Year:</label>
              <select id="yearselect"></select>
            </div>
            <div style="flex:1">
              <div id="seasonalgobtn" onclick="seasonGo()">GO</div>
            </div>
          </div>
        </div>
        <div class="rightcard">
          <div class="subtitleright">Genres</div>
          <div class="flexrightcard" id="genreplace">Action, Adventure, Anti-Hero, CGDCT, College, Comedy, Drama, Ecchi, Fantasy, Gag Humor, Game, Harem, Historical, Horror, Idol, Isekai, Iyashikei, Josei, Kids, Magical Girl, Martial Arts, Mecha, Military, Movie, Music, Mythology, Mystery, Otaku, Parody, Police, Psychological, Racing, Revenge, Romance, Rural, Samurai, School, Sci-Fi, Seinen, Shoujo, Shoujo Ai, Shounen, Shounen Ai, Slice of Life, Space, Sports, Super Power, Supernatural, Survival, Suspense, Time Travel, Vampire, Work</div>
          <button type="button" id="expandbtn" onclick="expandgenre()" class="btn btn-secondary btn-sm btn-lg btn-block"><i class="glyphicon glyphicon-menu-down"></i></button>
        </div>
        <div class="rightcard" style="border-top: 1px solid #3c3c3c;">
          <div class="flexrightcard" id="filterplace">
            <div class="halfleft">
              <label for="typeselect">Stream:</label>
              <select id="typeselect" onchange="typechange()">
                <option value="0">Any</option>
                <option value="1">GOGO Stream</option>
                <option value="7">API Stream</option>
                <option value="11">AL Stream</option>
                <option value="6">RUSH Stream</option>
              </select>
            </div>
            <div class="halfright">
              <label for="langselect">Sub/Dub:</label>
              <select id="langselect" onchange="langchange()">
                <option value="any">Any</option>
                <option value="sub">Sub</option>
                <option value="dub">Dub</option>
              </select>
            </div>
          </div>
        </div>
        <div class="rightcard" style="margin-bottom:20px">
          <div class="subtitleright">Weekly Top</div>
          <div id="ongoingplace" style="height:unset"></div>
          <button type="button" id="expandbtn2" onclick="expandweekly()" class="btn btn-secondary btn-sm btn-lg btn-block"><i class="glyphicon glyphicon-menu-down"></i></button>
        </div>
      </div>
    </div>
    <div id="topmid"></div>
  </div>
  <div id="playerleftsidebar" class="schedulemenucontainer">
    <button id="recomendedclosebtn" style="margin-left:10px" onclick="showschedulemenu()"><i class="glyphicon glyphicon-arrow-left"></i></button>
    <div id="seasontitle"></div>
    <div id="scheduletimezone"></div>
    <div id="recomendedlist" style="padding-top:unset"></div>
    <div id="schedulenotice">Release time is estimated</div>
  </div>
  <div class="leftbottom">
    <span id="donatelabel">Donate</span><a href="#donate" title="Bitcoin"><i class="customicon bitcoinicon"></i></a><a href="#donate" title="Ethereum"><i class="customicon ethereumicon"></i></a>
    <div class="floatright">
      <div class="togglelabel">Chat</div>
      <label class="switch">
        <input type="checkbox" id="enablechat">
        <span class="slider round"></span>
      </label> <a class="customicon rssicon" href="https://animixplay.to/rss.html"></a> <a href="/info.html" style="font-size: 17px;"><i class="glyphicon glyphicon-info-sign"></i></a><a class="customicon twittericon" href="https://twitter.com/AniMixPlay" rel="noreferrer" target="_blank"></a><br>
    </div>
  </div>
  <div class="footer">
    <span class="bottomtext">
      Watch HD Anime for Free &copy;2022 AniMixPlay
    </span>
    Disclaimer: This site does not store any files on its server. All contents are provided by non-affiliated third parties.
  </div>
  <div id="notifiaction"></div>
  <div id="lastwatch">
    <i onclick="lastwatchclose();" id="lastwatchclosebtn" class="glyphicon glyphicon-remove"></i>
    Continue watching :<br>
    <a id="lastwatchlink">
      <div id="lastwatchtitle"></div>
      <div id="lastwatchurl"></div>
    </a>
  </div>
  <script type="text/javascript">
    var nowtime = "2022-02-28 20:00:59";
    var envSeason = 'Winter';
    var envYear = 2022;
    var curFeatured = 8;
  </script>
</body>

</html>