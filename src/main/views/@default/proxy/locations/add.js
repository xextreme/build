Tea.context(function () {
	this.location = null;

	this.showSpeical = false;
	this.pattern = "";
	this.type = 2;
	this.root = "";
	this.charset = "";
	this.indexes = [];
	this.on = true;
	this.isCaseInsensitive = false;
	this.isReverse = false;

	this.submitSuccess = function () {
		alert("保存成功");
		window.location = "/proxy/locations?server=" + this.server.filename;
	};

	this.$delay(function () {
		this.$find("form input[name='pattern']").focus();
	});

	/**
	 * advanced settings
	 */
	this.advancedOptionsVisible = false;

	this.showAdvancedOptions = function () {
		this.advancedOptionsVisible = !this.advancedOptionsVisible;
	};

	/**
	 * special settings
	 */
	this.specialSettingsVisible = this.showSpecial; // 从参数中获取

	this.showSpecialSettings = function () {
		this.specialSettingsVisible = !this.specialSettingsVisible;
	};

	/**
	 * pattern
	 */
	this.patternDescription = "";
	this.changePatternType = function (patternType) {
		this.patternDescription = this.patternTypes.$find(function (k, v) {
			return v.type == patternType;
		}).description;
	};
	this.changePatternType(this.type);

	/**
	 * index
	 */
	this.indexAdding = false;
	this.addingIndexName = "";

	this.addIndex = function () {
		this.indexAdding = true;
		this.$delay(function () {
			this.$find("form input[name='addingIndexName']").focus();
		});
	};

	this.confirmAddIndex = function () {
		this.addingIndexName = this.addingIndexName.trim();
		if (this.addingIndexName.length == 0) {
			alert("文件名不能为空");
			this.$find("form input[name='addingIndexName']").focus();
			return;
		}
		this.indexes.push(this.addingIndexName);
		this.cancelIndexAdding();
	};

	this.cancelIndexAdding = function () {
		this.indexAdding = !this.indexAdding;
		this.addingIndexName = "";
	};

	this.removeLocationIndex = function (index) {
		this.indexes.$remove(index);
	};

	/**
	 * 匹配测试
	 */
	this.testingVisible = false;
	this.testingFinished = false;
	this.testingSuccess = false;
	this.testingMapping = null;
	this.testingError = "";

	this.showTesting = function () {
		this.testingVisible = !this.testingVisible;
		if (this.testingVisible) {
			this.$delay(function () {
				this.$find("form input[name='testingPath']").focus();
			});
		}
	};

	this.testSubmit = function () {
		this.testingFinished = false;
		this.testingError = "";
		this.testingMapping = null;

		var form = this.$find("#location-form")[0];
		var formData = new FormData(form);
		this.$post("/proxy/locations/test")
			.params(formData)
			.success(function (resp) {
				this.testingMapping = resp.data.mapping;
				this.testingFinished = true;
				this.testingSuccess = true;
			})
			.fail(function (resp) {
				if (resp.message != null && resp.message.length > 0) {
					this.testingError = resp.message;
				}

				this.testingFinished = true;
				this.testingSuccess = false;
			});
	};

	/**
	 * 单位
	 */
	this.maxBodyUnits = [{
		"code": "k",
		"name": "K"
	}, {
		"code": "m",
		"name": "M"
	}, {
		"code": "g",
		"name": "G"
	}];
	this.maxBodyUnit = "m";

	/**
	 * 压缩级别
	 */
	this.gzipLevels = Array.$range(1, 9);
	this.gzipMinUnits = [
		{
			"code": "b",
			"name": "B"
		},
		{
			"code": "k",
			"name": "K"
		}, {
			"code": "m",
			"name": "M"
		}];
	this.gzipMinUnit = "k";
});