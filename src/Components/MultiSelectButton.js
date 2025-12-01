import { useState } from 'react';
import ThemeButton from './ThemeButton';
import { Image, StyleSheet } from 'react-native';
import { Colors } from '../Theme/Variables';
import { hp, wp } from '../Hooks/useResponsive';

export const MultiSelectButton = ({
  items,
  isDisable,
  selectedAlter,
  onSelectVal,
  objId,
  isMultipule,
  btnStyle,
  textStyle,
  mainViewStyle,
  selectedBgColor,
  isPrimaryColorStyle,
  isGrayBg,
  textSize,
  isFixWidth,
}) => {
  const [dummy, setDummy] = useState(0);

  const handlePress = allergy => {};

  return items?.map((item, index) => (
    <>
      <ThemeButton
        key={index}
        onPress={() => {
          onSelectVal(objId, item);
          // setDummy(pre => pre + 1);
        }}
        isTopImg={item?.isTopImg}
        title={
          item?.name ??
          item?.title ??
          item?.label ??
          item?.area_name ??
          item?.sqYd ??
          item?.supplier_name ??
          item?.val ??
          item?.top_menus ??
          item
        }
        style={{
          ...styles.btnMain(
            isMultipule
              ? Boolean(selectedAlter?.find(res => res?.id == item.id))
              : Boolean(
                  (selectedAlter?.alternates?.id ??
                    selectedAlter?.id ??
                    selectedAlter?.slug) == (item?.id ?? item?.slug),
                ),
            selectedBgColor,
          ),
          ...(isPrimaryColorStyle
            ? styles.priceMultiView(
                isMultipule
                  ? Boolean(selectedAlter?.find(res => res?.id == item.id))
                  : Boolean(
                      (selectedAlter?.alternates?.id ??
                        selectedAlter?.id ??
                        selectedAlter?.slug) == (item?.id ?? item?.slug),
                    ),
              )
            : {}),
          ...(isGrayBg
            ? styles.grayBgView(
                isMultipule
                  ? Boolean(selectedAlter?.find(res => res?.id == item.id))
                  : Boolean(
                      (selectedAlter?.alternates?.id ??
                        selectedAlter?.id ??
                        selectedAlter?.slug) == (item?.id ?? item?.slug),
                    ),
              )
            : {}),
          ...(isFixWidth
            ? styles.fixwidth(
                isMultipule
                  ? Boolean(selectedAlter?.find(res => res?.id == item.id))
                  : Boolean(
                      (selectedAlter?.alternates?.id ??
                        selectedAlter?.id ??
                        selectedAlter?.slug) == (item?.id ?? item?.slug),
                    ),
              )
            : {}),
          ...btnStyle,
        }}
        textStyle={{
          ...styles.btnText(
            isMultipule
              ? Boolean(selectedAlter?.find(res => res?.id == item.id))
              : Boolean(
                  (selectedAlter?.alternates?.id ??
                    selectedAlter?.id ??
                    selectedAlter?.slug) == (item?.id ?? item?.slug),
                ),
          ),
          ...(isPrimaryColorStyle || isGrayBg || isFixWidth
            ? styles.primaryColorStye(
                isMultipule
                  ? Boolean(selectedAlter?.find(res => res?.id == item.id))
                  : Boolean(
                      (selectedAlter?.alternates?.id ??
                        selectedAlter?.id ??
                        selectedAlter?.slug) == (item?.id ?? item?.slug),
                    ),
              )
            : {}),
          ...textStyle,
          fontSize: textSize ? hp(textSize) : hp('1.5'),
        }}
        image={item?.image}
        isDisable={item?.disabled ?? isDisable}
        topImgStyles={{
          ...styles.imageStyle(
            isMultipule
              ? Boolean(selectedAlter?.find(res => res?.id == item.id))
              : Boolean(
                  (selectedAlter?.alternates?.id ??
                    selectedAlter?.id ??
                    selectedAlter?.slug) == (item?.id ?? item?.slug),
                ),
          ),
          ...(isPrimaryColorStyle || isGrayBg || isFixWidth
            ? styles.imageStyle(
                isMultipule
                  ? Boolean(selectedAlter?.find(res => res?.id == item.id))
                  : Boolean(
                      (selectedAlter?.alternates?.id ??
                        selectedAlter?.id ??
                        selectedAlter?.slug) == (item?.id ?? item?.slug),
                    ),
              )
            : {}),
        }}
        imageStyle={{
          ...styles.imageStyle(
            isMultipule
              ? Boolean(selectedAlter?.find(res => res?.id == item.id))
              : Boolean(
                  (selectedAlter?.alternates?.id ??
                    selectedAlter?.id ??
                    selectedAlter?.slug) == (item?.id ?? item?.slug),
                ),
          ),
          ...(isPrimaryColorStyle || isGrayBg || isFixWidth
            ? styles.imageStyle(
                isMultipule
                  ? Boolean(selectedAlter?.find(res => res?.id == item.id))
                  : Boolean(
                      (selectedAlter?.alternates?.id ??
                        selectedAlter?.id ??
                        selectedAlter?.slug) == (item?.id ?? item?.slug),
                    ),
              )
            : {}),
        }}
      />
    </>
  ));
};
export const styles = StyleSheet.create({
  btnMain: (isSelected, selectedBgColor) => ({
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.textGray,
    height: hp('4.5'),
    width: 'auto',
    paddingHorizontal: wp('4.7'),
    marginRight: wp('2'),
    marginBottom: hp('1'),
    backgroundColor: isSelected
      ? selectedBgColor ?? Colors.textGray
      : 'transparent',
  }),
  btnText: isSelected => ({
    color: isSelected ? 'white' : '#525252',
    fontSize: hp('1.5'),
  }),
  priceMultiView: isSelected => ({
    paddingHorizontal: wp('3'),
    backgroundColor: isSelected ? Colors.primaryColor : 'white',
    overflow: 'hidden',
    height: 'auto',
    paddingVertical: hp('1'),
    borderWidth: 0.5,
    borderColor: Colors.primaryColor,
    borderRadius: 10,
  }),
  fixwidth: isSelected => ({
    backgroundColor: isSelected ? Colors.primaryColor : 'white',
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.primaryColor,
    borderRadius: 10,
    width: wp('20.5'),
    paddingVertical: hp('1'),
    height: 'auto',
  }),
  grayBgView: isSelected => ({
    paddingHorizontal: wp('3'),
    backgroundColor: isSelected ? Colors.grayFaded : 'white',
    overflow: 'hidden',
    height: 'auto',
    paddingVertical: hp('1'),
    borderWidth: 0,
    borderColor: Colors.gray,
  }),
  primaryColorStye: isSelected => ({
    fontSize: hp('1.2'),
    color: isSelected ? 'white' : Colors.primaryColor,
    fontWeight: '400',
  }),
  imageStyle: isSelected => ({
    width: wp('4'),
    height: hp('2'),
    tintColor: isSelected ? 'white' : Colors.primaryColor,
  }),
});
