import { ActionPF2e } from "@item/action";
import { ItemSheetDataPF2e } from "@item/sheet/data-types";
import { ItemSheetPF2e } from "../sheet/base";

export class ActionSheetPF2e extends ItemSheetPF2e<ActionPF2e> {
    override async getData() {
        const data: ItemSheetDataPF2e<ActionPF2e> = await super.getData();
        const actorWeapons = this.actor?.itemTypes.weapon.map((weapon) => weapon.data) ?? [];
        const actionType = data.data.actionType.value || "action";
        const actionImg = (() => {
            switch (actionType) {
                case "action":
                    return (data.data.actions.value || 1).toString();
                case "reaction":
                case "free":
                case "passive":
                    return actionType;
                default:
                    return "passive";
            }
        })();

        data.item.img = this.getActionImg(actionImg);

        return {
            ...data,
            categories: CONFIG.PF2E.actionCategories,
            weapons: actorWeapons,
            actionTypes: CONFIG.PF2E.actionTypes,
            actionsNumber: CONFIG.PF2E.actionsNumber,
            actionTraits: CONFIG.PF2E.actionTraits,
            skills: CONFIG.PF2E.skillList,
            proficiencies: CONFIG.PF2E.proficiencyLevels,
            traits: this.prepareOptions(CONFIG.PF2E.actionTraits, data.data.traits),
        };
    }
}
