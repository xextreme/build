Tea.context(function () {
    this.advancedVisible = false;

    /**
     * key
     */
    var that = this;
    this.key = "${host}${requestURI}";
    this.formatKey = function () {
        var key = that.key;
        key = key.replace(/\${(.+?)}/g, "${<a>$1</a>}");
        return key;
    };

    /**
     * 状态管理
     */
    this.statusList = [ "200" ];

    this.statusAdding = false;
    this.addingStatus = "";

    this.addStatus = function () {
        this.statusAdding = true;
        this.$delay(function () {
            this.$find("form input[name='addingStatus']").focus();
        });
    };

    this.cancelAdding = function () {
        this.statusAdding = false;
    };

    this.addStatusConfirm = function (e) {
        if (this.addingStatus.length != 3) {
            alert("状态码必须是3位数字");
            this.$find("form input[name='addingStatus']").focus();
            return;
        }
        if (this.statusList.$contains(this.addingStatus)) {
            alert("状态码已存在");
            this.$find("form input[name='addingStatus']").focus();
            return;
        }
        this.statusList.push(this.addingStatus);
        this.statusAdding = false;
        this.addingStatus = "";

        return false;
    };

    this.deleteStatus = function (index) {
        this.statusList.$remove(index);
    };

    /**
     * 类型
     */
    this.cacheType = this.types[0].type;

    this.showAdvanced = function (b) {
        this.advancedVisible = b;
    };

    /**
     * Redis
     */
    this.optionsNetwork = "tcp";
});