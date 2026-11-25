import { option, list, report, selectors } from '@cairul/plugin-kit/runner';
import { testng } from '@cairul/plugin-kit/reports';

export default {
  command: undefined,
  select: selectors({ suites: list, classes: list, methods: list, groups: list }),
  build(select, temp) {
    if (!select.suites && !select.classes && !select.methods)
      throw new Error('Supply TestNG suites, classes, or methods; use groups to narrow that selection.');
    return {
      args: [
        '-d',
        temp,
        '-usedefaultlisteners',
        'true',
        ...option('-testclass', select.classes?.join(',')),
        ...option('-methods', select.methods?.join(',')),
        ...option('-groups', select.groups?.join(',')),
        ...(select.suites ?? []),
      ],
      read: report('testng-results.xml', testng),
    };
  },
};
