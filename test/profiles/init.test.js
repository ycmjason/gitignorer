const os = require('os');
const path = require('path');
const {
  readFileSync,
  writeFileSync,
  removeSync,
  emptyDirSync,
} = require('fs-extra');

const {
  createGitignoreProfiles,
  beforeEachCreateHomeAndCreateCwdAtNthLevelDeep_afterAllRemoveAll,
} = require('../helpers');

const initProfiles = require('../../lib/profiles/init');

const specs = [
  {
    desc: 'should return Promise that resolves to an object with default: [] when given non-existing file',
    args: [],
    expectProfile: 'default',
    toResolveTo: [],
  },

  {
    desc: 'should return Promise that resolves to default as defined',
    gitignore_profiles: {
      default: [
        'coooool bean',
        'some',
      ],
    },
    expectProfile: 'default',
    toResolveTo: [
      'coooool bean',
      'some',
    ],
  },

  {
    desc: 'should return Promise that resolves to default as defined',
    gitignore_profiles: {
      default: [
        'coooool bean',
        'some',
      ],
    },
    expectProfile: 'another',
    toResolveTo: [
      'coooool bean',
      'some',
    ],
  },

  {
    desc: 'should proxy to defined profiles to corresponding ones',
    gitignore_profiles: {
      default: [
        'coooool bean',
        'some',
      ],
      happy: [
        'this',
        'is',
        'cool',
      ],
    },
    expectProfile: 'happy',
    toResolveTo: [
      'this',
      'is',
      'cool',
    ]
  },

  {
    desc: 'should call axios.get with the url and replace the value with the response',
    gitignore_profiles: {
      default: [
        'coooool bean',
        'some',
      ],
      java: [
        'yoyoy',
        'url: https://raw.githubusercontent.com/github/gitignore/master/Java.gitignore',
        'hello world',
      ],
    },
    expectProfile: 'java',
    toResolveTo: [
      'yoyoy',
      `# Compiled class file
*.class

# Log file
*.log

# BlueJ files
*.ctxt

# Mobile Tools for Java (J2ME)
.mtj.tmp/

# Package Files #
*.jar
*.war
*.ear
*.zip
*.tar.gz
*.rar

# virtual machine crash logs, see http://www.java.com/en/download/help/error_hotspot.xml
hs_err_pid*
`,
      'hello world',
    ],
  },

];

describe('initProfiles', () => {
  beforeEach(jest.resetModules);
  const {
    home,
    cwd,
  } = beforeEachCreateHomeAndCreateCwdAtNthLevelDeep_afterAllRemoveAll(24);

  const gitignore_profiles_path = path.join(home, '.gitignore.profiles.js');

  specs.forEach(({
    desc,
    args = [gitignore_profiles_path],
    gitignore_profiles,
    expectProfile,
    toResolveTo
  }) => {
    test(desc, async () => {
      if (gitignore_profiles) {
        createGitignoreProfiles(home, gitignore_profiles);
      }

      const profilesProxy = initProfiles(...args);

      return expect(await profilesProxy[expectProfile]).toEqual(toResolveTo);
    });
  });

});
