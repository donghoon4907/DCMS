function VideoEdit() {
  this.app = null; // editor 객체 저장
  this.usernm = this.getParam("usernm"); // 사용자명
  this.id = this.getParam("refid"); // 컨텐츠 아이디
  this.endframe = Math.floor(
    Number(this.getParam("runtime")) * Number(this.getParam("framerate"))
  );
  this.videourl = this.getParam("video_url");
  this.thumburl = this.getParam("thumb_url");
  this.title = decodeURIComponent(this.getParam("title")); // 컨텐츠 제목
  this.duration = this.getParam("runtime"); // 컨텐츠 영상 재생시간
  this.init();
}

VideoEdit.prototype = {
  init: function() {
    var that = this;

    this.app = new gvEditor({
      target_id: "app",
      use_search_panel: false,
      title: "Video Web Cut Editor",
      userinfo: {
        usernm: that.usernm
      },
      exportbtn: {
        evt: function() {
          try {
            var editedData = that.getEditedDatas();
            var parsedEditedData = JSON.parse(editedData);
            opener.document.getElementById("export").value =
              parsedEditedData[0].startframe +
              "," +
              parsedEditedData[0].endframe;
            self.close();
          } catch (e) {
            alert("먼저 영상을 편집해야 합니다.");
          }
        }
      }
    });
    this.addItem();
  },

  getEditedDatas: function(_) {
    return this.app.exportDatas();
  },

  addItem: function(_) {
    var that = this;
    this.app.addItem({
      type: "video",
      startframe: 0,
      endframe: that.endframe,
      url: "http://localhost:3001/videos/" + that.videourl,
      thumb_url: "http://localhost:3001/images/" + that.thumburl,
      title: that.title,
      ref_id: that.id,
      origin: {
        duration: that.duration,
        tot_framecnt: that.endframe
      }
    });
  },

  clearEditTimeline: function(_) {
    this.app.clearEditTmeline();
  },

  getParam: function(sname) {
    var params = decodeURIComponent(location.search).substr(
      location.search.indexOf("?") + 1
    );
    var sval = false;
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
      temp = params[i].split("=");
      if ([temp[0]] == sname) {
        sval = temp[1];
      }
    }
    return sval;
  }
};

new VideoEdit();
