function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
  }
var auth = utf8_to_b64("unOYa%faNJ1v_4M#tY*A=lMQZM8gWlX5N#tMUPohAO0g1kYzj*rY7c25gVPpXo%5n0y|0Mwlo|X#=Yr??d-Zv+%sB@OPO_2HLkmjLanZ2L&P7BVY4_2N4+j4E9P#pzxMB?kuiFS7@CSldYRrk?djKcRqD1Et67&-v7PKea9yTom7h&M-+iGy=9Wi0hsx8pG6Ib@52!YtGqgpOtKwA=Dvd8KNj#zej&PG=mpmdZ87d@50_KcoOg8FEWD_pc-G4fek")
