import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Modal } from './Modal';
import { getTheme } from '../modules/theme';

import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';

interface DropDownItemProperties {
  first: boolean;
  last: boolean;
  label: string;
  value: any;
  onPress: (value: any) => void;
}

class DropDownItem extends React.PureComponent<DropDownItemProperties> {
  render() {
    const { first, last, label, value, onPress } = this.props;

    return (
      <TouchableHighlight
        onPress={() => onPress(value)}
        underlayColor={theme.backgroundColor2}
        style={{
          borderTopLeftRadius: first ? 5 : 0,
          borderTopRightRadius: first ? 5 : 0,
          borderBottomLeftRadius: last ? 5 : 0,
          borderBottomRightRadius: last ? 5 : 0
        }}
      >
        <Text style={styles.modalItem}>{label}</Text>
      </TouchableHighlight>
    );
  }
}

export interface DropDownProperties {
  label: string;
  items: Array<{ label: string; value: any }>;
  value: any | null;
  onChange: (value: any) => void;
  style?: StyleProp<ViewStyle>;
}

export interface DropDownState {
  modalOpen: boolean;
}

export class DropDown extends React.Component<
  DropDownProperties,
  DropDownState
> {
  state: DropDownState = {
    modalOpen: false
  };

  handleItemPress = (value: any) => {
    const { onChange } = this.props;

    this.setState({ modalOpen: false });
    onChange(value);
  };

  render() {
    const { modalOpen } = this.state;
    const { label, items, value, style } = this.props;
    const selectedItem = items.find(x => x.value === value);

    return (
      <TouchableWithoutFeedback
        onPress={() => this.setState({ modalOpen: true })}
      >
        <View style={[styles.container, style]}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.text}>
            {selectedItem ? selectedItem.label : '-'}
          </Text>
          <FontAwesome name="caret-down" style={styles.seta} />
          <Modal
            visible={modalOpen}
            onRequestClose={() => this.setState({ modalOpen: false })}
            overlayStyle={styles.modalOverlay}
          >
            <View style={styles.modalContainer}>
              <FlatList
                data={items}
                initialNumToRender={items.length}
                keyExtractor={item => item.value.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <DropDownItem
                      first={index === 0}
                      last={index === items.length - 1}
                      label={item.label}
                      value={item.value}
                      onPress={this.handleItemPress}
                    />
                  );
                }}
              />
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const theme = getTheme();

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: theme.borderColor1,
    borderRadius: 3
  },
  label: {
    color: theme.textColor2,
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    lineHeight: 16
  },
  text: {
    height: 22,
    color: theme.textColor1,
    fontFamily: 'Lato-Bold',
    fontSize: 16
  },
  seta: {
    color: theme.textColor1,
    fontSize: 16,
    position: 'absolute',
    bottom: 10,
    right: 16
  },
  modalOverlay: {
    justifyContent: 'center'
  },
  modalContainer: {
    borderRadius: 5,
    backgroundColor: theme.backgroundColor1,
    margin: 16
  },
  modalItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontFamily: 'Lato-Bold',
    fontSize: 16
  }
});
