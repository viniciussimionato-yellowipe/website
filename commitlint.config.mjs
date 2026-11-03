// Conventional Commits: feat, fix, docs, style, refactor, perf, test, build, ci, chore, content, seo
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'content',
        'seo',
      ],
    ],
    'subject-case': [0],
  },
};
