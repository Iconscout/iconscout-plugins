var userDefaults = NSUserDefaults.alloc().initWithSuiteName("com.iconscout.sketch.icondrop");

Storage = {
    loadMany: function (keys) {
        var results = {};
        for (var i = keys.length - 1; i >= 0; i--) {
            var key = keys[i];
            results[key] = this.parseJsonOrString(this.get(key));
        }
        return results;
    },
    has: function (key) {
        return (userDefaults.objectForKey(key) != null);
    },
    get: function (key) {
        if(this.has(key)) {
            return userDefaults.objectForKey(key);
        }
        return null;
    },
    put: function (key, value) {
        userDefaults.setObject_forKey(value, key);
        userDefaults.synchronize();
    },
    clear: function (key) {
        userDefaults.removeObjectForKey(key);
        userDefaults.synchronize();
    },
    parseJsonOrString: function(value) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return value;
        }
    }
};