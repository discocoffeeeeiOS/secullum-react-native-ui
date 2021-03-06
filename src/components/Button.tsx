import * as React from 'react';
import { getTheme } from '../modules/theme';

import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle
} from 'react-native';

export interface ButtonProperties {
  text: string;
  primary?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export class Button extends React.Component<ButtonProperties> {
  static defaultProps = {
    primary: true
  };

  render() {
    const { text, primary, style, onPress } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.touchable, primary && styles.touchablePrimary, style]}
        onPress={onPress}
      >
        <Text style={[styles.text, primary && styles.textPrimary]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const theme = getTheme();

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: theme.backgroundColor1,
    borderColor: theme.borderColor1,
    borderWidth: 1,
    borderRadius: 3,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchablePrimary: {
    backgroundColor: theme.backgroundColor3,
    borderWidth: 0
  },
  text: {
    fontFamily: 'Lato-Bold',
    fontSize: 13,
    paddingHorizontal: 11,
    color: theme.textColor1
  },
  textPrimary: {
    color: theme.textColor4
  }
});
