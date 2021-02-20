/*~struct~actorSkillMap:
 * @param actorId
 * @type actor
 * @text アクター
 * @desc 防御スキルを置き換える対象のアクター
 * 
 * @param skillId
 * @type skill
 * @default 2
 * @text スキル
 * @desc 防御に対応するスキル
 */

/*:
 * @target MZ
 * @plugindesc 防御スキルを任意のスキルに置き換えます
 * @author sixpooh
 * 
 * @help GuardSkillReplace.js
 *
 * 特定のアクターの防御スキルを任意のスキルに置き換えます。
 * プラグインのパラメータ設定にて対象となる
 * アクター-スキルの組み合わせを設定してください。
 *
 * @param list
 * @type struct<actorSkillMap>[]
 * @text 対象一覧
 * @desc 防御スキルを置き換える対象のアクター-スキルのリスト
 */

(() => {
    const pluginName = 'guardSkillReplace';
    const settings = JSON.parse(PluginManager.parameters(pluginName).list)
        .map((struct) => JSON.parse(struct));
    
    const _Game_BattlerBase_guardSkillId = Game_BattlerBase.prototype.guardSkillId;
    Game_BattlerBase.prototype.guardSkillId = function() {
        let target = null;
        if (this.isActor() && (target = settings.find(({ actorId }) => this.actorId() == +actorId))) {
            return +target.skillId;
        }

        return _Game_BattlerBase_guardSkillId();
    };
})();