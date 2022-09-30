import { MantineTheme, MantineThemeOverride } from "@mantine/core";

import fontRegular from './../../../assets/fonts/HelveticaNeueCyr-Roman.woff2'
import fontMedium from './../../../assets/fonts/HelveticaNeueCyr-Medium.woff2'
import fontSemiBold from './../../../assets/fonts/HelveticaNeueCyr-Bold.woff2'

export const MantineThemeConfig: MantineThemeOverride = {
  fontFamily: 'Helvetica Neue Cyr',
  headings: {
    fontFamily: ['sans-serif', 'Helvetica Neue Cyr'],
    fontWeight: 500,
    sizes: {
      h2: {
        fontSize: '26px',
        lineHeight: '22px'
      }
    }
  },
  colors: {
    primary: [ '#409EFF' ],
    background: [ '#F0F0F0' ],
    backgroundDark: [ '#151819' ],
  },
  spacing: {
    md: 10,
  },
  components: {
    Container: {
      defaultProps: {
        sizes: {
          md: 1660,
        },
      }
    },
    Avatar: {
      defaultProps: {
        lg: 56,
      }
    },
    ActionIcon: {
      defaultProps: {
        variant: 'transparent',
      },
      styles: (theme) => ({
        transparent: {
          color: 'black',
        },
        light: {
          backgroundColor: theme.colorScheme === 'dark'
            ? theme.colors.dark[7] : theme.colors.gray[1],
          color: theme.colorScheme === 'dark'
            ? theme.colors.gray[4] : theme.colors.dark[5],
        }
      }),
    },
    TextInput: {
      styles: {
        defaultVariant: {
          borderColor: '#DCDFE6'
        },
        label: {
          fontWeight: 400,
        },
      },
    },
    PasswordInput: {
      styles: {
        defaultVariant: {
          borderColor: '#DCDFE6',
        },
        label: {
          fontWeight: 400,
        },
      },
    },
    DatePicker: {
      styles: {
        defaultVariant: {
          borderColor: '#DCDFE6'
        },
        label: {
          fontWeight: 400,
        },
      },
    },
    Select: {
      styles: {
        defaultVariant: {
          borderColor: '#DCDFE6',
        },
        label: {
          fontWeight: 400,
        },
      },
    },
    Textarea: {
      styles: {
        defaultVariant: {
          borderColor: '#DCDFE6'
        },
        label: {
          fontWeight: 400,
        }
      },
    },
    Button: {
      styles: (theme, params) => ({
        root: {
          fontSize: 14,
          fontWeight: 500,
          border: 0,
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
          color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.dark[5],
          '&:hover': {
            backgroundColor: theme.colorScheme === 'dark'
              ? theme.colors.dark[4] : theme.colors.gray[2]
          },
        },
      }),
    },
    Card: {
      styles: (theme: MantineTheme) => ({
        root: {
          borderColor: theme.colorScheme === 'dark'
            ? theme.colors.gray[8]
            : theme.colors.gray[3],
        }
      }),
    },
  }
}

export const mantineGlobalStyles = (theme: MantineTheme) => [
  {
    '@font-face': {
      fontFamily: 'Helvetica Neue Cyr',
      src: `url('${fontRegular}') format("woff2")`,
      fontWeight: 400,
      fontStyle: 'normal',
    },
  },
  {
    '@font-face': {
      fontFamily: 'Helvetica Neue Cyr',
      src: `url('${fontMedium}') format("woff2")`,
      fontWeight: 500,
      fontStyle: 'normal',
    },
  },
  {
    '@font-face': {
      fontFamily: 'Helvetica Neue Cyr',
      src: `url('${fontSemiBold}') format("woff2")`,
      fontWeight: 600,
      fontStyle: 'normal',
    },
  },
  {
    body: {
      backgroundColor: theme.colorScheme === 'light' ? theme.colors.background : theme.colors.backgroundDark,
    },
  }
]