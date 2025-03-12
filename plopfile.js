export default function (plop) {
  plop.setHelper('cwd', () => process.cwd());

  // React component generator
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is your component name?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: '{{cwd}}/{{properCase componentName}}/index.ts',
        templateFile: '.plop-templates/component/index.ts.hbs'
      },
      {
        type: 'add',
        path: '{{cwd}}/{{properCase componentName}}/{{properCase componentName}}.tsx',
        templateFile: '.plop-templates/component/Component.tsx.hbs'
      },

      {
        type: 'add',
        path: '{{cwd}}/{{properCase componentName}}/{{properCase componentName}}.module.scss',
        templateFile: '.plop-templates/component/Component.module.scss.hbs'
      }
    ]
  });

  // React component with forwardRef generator
  plop.setGenerator('forwardRef-component', {
    description: 'Create a component with forwardRef',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is your component name?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: '{{cwd}}/{{properCase componentName}}/index.ts',
        templateFile: '.plop-templates/ref-component/index.ts.hbs'
      },
      {
        type: 'add',
        path: '{{cwd}}/{{properCase componentName}}/{{properCase componentName}}.tsx',
        templateFile: '.plop-templates/ref-component/Component.tsx.hbs'
      },

      {
        type: 'add',
        path: '{{cwd}}/{{properCase componentName}}/{{properCase componentName}}.module.scss',
        templateFile: '.plop-templates/ref-component/Component.module.scss.hbs'
      }
    ]
  });
};
