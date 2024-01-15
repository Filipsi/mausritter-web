import React from 'react';
import styled from 'styled-components';

import { CreatureData } from './bestiaryTypes';
import BodyText from '../styles/BodyText';

const CreatureContainer = styled.div`
    background: white;
    padding: 1rem 2rem;
`;

const StatBlockContainer = styled.div`
    --stat-block-background: #f5f5f5;

    position: relative;

    padding: 0.4rem 0.8rem;
    margin-bottom: 0.5rem;

    background: var(--stat-block-background);

    font-weight: 500;

    .special {
        font-weight: normal;
    }

    .attack-special {
        font-weight: normal;
    }
`;

const Corner = styled.span`
    position: absolute;
    width: 0.4rem;
    height: 0.4rem;

    background: linear-gradient(
        -45deg,
        var(--stat-block-background) 0%,
        var(--stat-block-background) 50%,
        white 50%,
        white 100%
    );

    &.top {
        top: 0;
    }

    &.bottom {
        bottom: 0;
    }

    &.left {
        left: 0;
    }

    &.right {
        right: 0;
    }

    &.top.left {
        transform: rotate(0deg);
    }

    &.top.right {
        transform: rotate(90deg);
    }

    &.bottom.left {
        transform: rotate(270deg);
    }

    &.bottom.right {
        transform: rotate(180deg);
    }
`;

const CreatureWants = styled.div`
    font-style: italic;

    strong {
        font-weight: bold;
    }
`;

const styleAttack = (attack: string): React.ReactElement | string => {
    if (attack.includes('(')) {
        const before = attack.split('(')[0];
        const after = attack.split(')')[1];

        return (
            <>
                {before}
                <span className="attack-special">
                    ({attack.split('(')[1].split(')')[0]})
                </span>
                {after}
            </>
        );
    }

    return attack;
};

const Creature = ({ creature }: { creature: CreatureData }): any => {
    const {
        name,
        description,
        warband_scale,
        hp,
        str,
        dex,
        wil,
        armour,
        attack_1,
        attack_2,
        attack_join,
        critical_damage,
        special,
        wants,
        variant_title,
        variant_1,
        variant_2,
        variant_3,
        variant_4,
        variant_5,
        variant_6,
    } = creature.properties;

    const variants = [
        variant_1,
        variant_2,
        variant_3,
        variant_4,
        variant_5,
        variant_6,
    ].filter(Boolean);

    return (
        <CreatureContainer>
            <BodyText className="small">
                <h2>{name}</h2>

                {description && <p>{description}</p>}

                <StatBlockContainer>
                    <Corner className="top left" />
                    <Corner className="top right" />
                    <Corner className="bottom left" />
                    <Corner className="bottom right" />

                    {warband_scale && <div>Warband Scale</div>}

                    <div className="stats">
                        {hp}hp, STR {str}, DEX {dex}, WIL {wil}
                        {armour && `, Armour ${armour}`}
                    </div>

                    <div className="attacks">
                        Attacks: {styleAttack(attack_1 || '')} {attack_join}{' '}
                        {styleAttack(attack_2 || '')}
                    </div>

                    {critical_damage && critical_damage.length && (
                        <div className="critical-damage">
                            Critical damage: {critical_damage}
                        </div>
                    )}

                    <div className="special">{special}</div>
                </StatBlockContainer>

                <CreatureWants>
                    <strong>Wants</strong> {wants}
                </CreatureWants>

                <h3>{variant_title}</h3>

                <ol>
                    {variants.map((variant, index) => (
                        <li
                            key={index}
                            dangerouslySetInnerHTML={{ __html: variant }}
                        />
                    ))}
                </ol>
            </BodyText>
        </CreatureContainer>
    );
};

export default Creature;
