import { Card, Stack } from "@mantine/core";
import type { CharacterState } from "../types/Character";
import { AffectType } from "../types/Skill";
import { formatNumber } from "../battle/utilities";

export const StatsList = (props: { character: CharacterState }) => {
  const atkBuff = props.character.atk;
  const atkPercentage = props.character.buff.reduce((acc, buff) => {
    if (buff.type === 0 && buff._0?.affectType === AffectType.ATK) {
      return acc + buff._0?.value;
    }
    if (buff.type === 3 && buff._3?.affectType === AffectType.ATK) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }
    return acc;
  }, 0);
  const rawAtk = props.character.buff.reduce((acc, buff) => {
    if (buff.type === 0 && buff._0?.affectType === AffectType.RAWATK) {
      return acc + buff._0?.value;
    }
    return acc;
  }, 0);

  const increaseDmg = props.character.buff.reduce((acc, buff) => {
    if (buff.type === 0 && buff._0?.affectType === AffectType.INCREASE_DMG) {
      return acc + buff._0?.value;
    }
    if (buff.type === 3 && buff._3?.affectType === AffectType.INCREASE_DMG) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }
    if (buff.type === 0 && buff._0?.affectType === AffectType.DECREASE_DMG) {
      return acc - buff._0?.value;
    }
    if (buff.type === 3 && buff._3?.affectType === AffectType.DECREASE_DMG) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const basicAtkBuff = props.character.buff.reduce((acc, buff) => {
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_BASIC_DAMAGE
    ) {
      return acc + buff._0?.value;
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_BASIC_DAMAGE
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_BASIC_DAMAGE
    ) {
      return acc - buff._0?.value;
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_BASIC_DAMAGE
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }

    return acc;
  }, 0);

  const darkAttribute = props.character.buff.reduce((acc, buff) => {
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_DARK_DMG
    ) {
      return acc + buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_DARK_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_DARK_DMG
    ) {
      return acc - buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_DARK_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const lightAttribute = props.character.buff.reduce((acc, buff) => {
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_LIGHT_DMG
    ) {
      return acc + buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_LIGHT_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_LIGHT_DMG
    ) {
      return acc - buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_LIGHT_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const fireAttribute = props.character.buff.reduce((acc, buff) => {
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_FIRE_DMG
    ) {
      return acc + buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_FIRE_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_FIRE_DMG
    ) {
      return acc - buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_FIRE_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const windAttribute = props.character.buff.reduce((acc, buff) => {
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_WIND_DMG
    ) {
      return acc + buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WIND_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_WIND_DMG
    ) {
      return acc - buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WIND_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const waterAttribute = props.character.buff.reduce((acc, buff) => {
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_WATER_DMG
    ) {
      return acc + buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WATER_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_WATER_DMG
    ) {
      return acc - buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WATER_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const triggerAttribute = props.character.buff.reduce((acc, buff) => {
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_TRIGGER_DAMAGE
    ) {
      return acc + buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_TRIGGER_DAMAGE
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_TRIGGER_DAMAGE
    ) {
      return acc - buff._0?.value;
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_TRIGGER_DAMAGE
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const ultimateAttribute = props.character.buff.reduce((acc, buff) => {
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_ULTIMATE_DAMAGE
    ) {
      return acc + buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_ULTIMATE_DAMAGE
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_ULTIMATE_DAMAGE
    ) {
      return acc - buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_ULTIMATE_DAMAGE
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const otherAttribute = props.character.buff.reduce((acc, buff) => {
    return acc;
    //TO BE ADDED
  }, 0);

  return (
    <Stack gap={5}>
      <Card py={5} px={10}>
        基礎攻擊力: {formatNumber(atkBuff)}
      </Card>
      <Card py={5} px={10}>
        攻擊力加成%: {Math.floor(atkPercentage * 100)}%
      </Card>
      <Card py={5} px={10}>
        攻擊力加成(定值): {formatNumber(rawAtk)}
      </Card>
      <Card py={5} px={10}>
        造成傷害加成%: {Math.floor(increaseDmg * 100)}%
      </Card>
      <Card py={5} px={10}>
        火屬性傷害加成%: {Math.floor(fireAttribute * 100)}%
      </Card>
      <Card py={5} px={10}>
        水屬性傷害加成%: {Math.floor(waterAttribute * 100)}%
      </Card>
      <Card py={5} px={10}>
        風屬性傷害加成%: {Math.floor(windAttribute * 100)}%
      </Card>
      <Card py={5} px={10}>
        光屬性傷害加成%: {Math.floor(lightAttribute * 100)}%
      </Card>
      <Card py={5} px={10}>
        暗屬性傷害加成%: {Math.floor(darkAttribute * 100)}%
      </Card>
      <Card py={5} px={10}>
        必殺效果加成%: {Math.floor(ultimateAttribute * 100)}%
      </Card>
      <Card py={5} px={10}>
        普攻效果加成%: {Math.floor(basicAtkBuff * 100)}%
      </Card>
      <Card py={5} px={10}>
        觸發效果加成%: {Math.floor(triggerAttribute * 100)}%
      </Card>
      <Card py={5} px={10}>
        其他類效果加成%: {Math.floor(otherAttribute * 100)}%
      </Card>
    </Stack>
  );
};
