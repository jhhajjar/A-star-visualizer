$(document).ready(function() {
  $("#BFS_button").click(function() {
    reset()
    setBFS()
  });
  $("#a_star_button").click(function() {
    reset()
    setAStar()
  });
  $("#greedy_button").click(function() {
    reset()
    setGreedy()
  });
});
